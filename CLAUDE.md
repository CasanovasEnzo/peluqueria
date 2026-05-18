# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands must be run from the `peluqueria/` directory.

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint

npm run db:generate  # Regenerate Prisma client after schema changes
npm run db:push      # Apply schema changes to the local SQLite DB
npm run db:seed      # Seed initial services (idempotent — skips if data exists)
npm run db:studio    # Open Prisma Studio GUI
```

After editing `prisma/schema.prisma`, always run `db:push` then `db:generate`.

## Architecture

**Stack**: Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4 · Prisma + LibSQL (SQLite) · better-auth

### Data model

- `Servicio` — hair salon services (nombre, precio, duracion, activo)
- `Turno` — appointments linking a `User` to a `Servicio` (fecha, estado: PENDIENTE | CONFIRMADO | CANCELADO | COMPLETADO)
- `User` — has a `role` field (CLIENT | ADMIN); Session/Account/Verification are managed by better-auth

### Auth flow

- Server config: `lib/auth.ts` — `betterAuth` with Prisma adapter, email/password, and a custom `role` field
- Client helper: `lib/auth-client.ts` — exports `signIn`, `signOut`, `signUp`, `useSession`
- API catch-all: `app/api/auth/[...all]/route.ts` bridges Next.js to better-auth
- Server-side session: `auth.api.getSession({ headers: await headers() })`
- Admin guard: `app/admin/layout.tsx` checks `session.user.role === "ADMIN"` server-side and redirects otherwise

### Route structure

```
app/
  (auth)/login | registro     — auth pages (route group, no shared layout)
  admin/                      — ADMIN-only panel (layout enforces role)
    page.tsx                  — dashboard with stats + recent turnos
    turnos/ | servicios/ | clientes/
  servicios/                  — public service listing
  turnos/nuevo/               — 3-step booking wizard (client component)
  mis-turnos/                 — user's own appointments

app/api/
  auth/[...all]/              — better-auth handler
  servicios/                  — public GET
  turnos/                     — GET (user's) + POST (create)
  turnos/[id]/                — PATCH (update estado)
  admin/servicios/            — admin CRUD for services
```

### Database

SQLite file at `prisma/dev.db` via the LibSQL adapter (`@prisma/adapter-libsql`). The `lib/prisma.ts` singleton uses the adapter directly:

```ts
new PrismaClient({ adapter: new PrismaLibSql({ url: "file:prisma/dev.db" }) })
```

The `prisma.config.ts` at project root mirrors this config for CLI commands.

### Styling

Tailwind CSS v4 with a dark neon theme: primary background `#0A0A0A`, neon accent `#CCFF00` (admin), purple `#8B14FD` (public site). Custom classes like `btn-neon`, `neon-border`, `card-hover`, and `text-gradient-neon` are defined in `app/globals.css`. Fonts: **Bebas Neue** (headings) + **Space Grotesk** (body), loaded via Google Fonts in `app/layout.tsx`.
