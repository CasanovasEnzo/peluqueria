export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Prisma } from "@prisma/client";

type TurnoConServicio = Prisma.TurnoGetPayload<{ include: { servicio: true } }>;

const TZ = "America/Argentina/Buenos_Aires";

const estadoConfig: Record<string, { label: string; className: string; dot: string }> = {
  PENDIENTE:   { label: "PENDIENTE",   className: "bg-yellow-900/20 text-yellow-400 border-yellow-500/30",   dot: "bg-yellow-400" },
  CONFIRMADO:  { label: "CONFIRMADO",  className: "bg-[#CCFF0010] text-[#CCFF00] border-[#CCFF0030]",       dot: "bg-[#CCFF00]" },
  CANCELADO:   { label: "CANCELADO",   className: "bg-red-900/20 text-red-400 border-red-500/30",            dot: "bg-red-500" },
  COMPLETADO:  { label: "COMPLETADO",  className: "bg-white/5 text-neutral-500 border-white/10",             dot: "bg-neutral-500" },
};

export default async function MisTurnosPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const turnos = await prisma.turno.findMany({
    where: { userId: session.user.id },
    include: { servicio: true },
    orderBy: { fecha: "desc" },
  });

  const ahora = new Date();
  const proximos = turnos.filter((t) => t.fecha >= ahora && t.estado !== "CANCELADO");
  const pasados  = turnos.filter((t) => t.fecha < ahora || t.estado === "CANCELADO");

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <section className="bg-[#111111] border-b border-[#CCFF0015] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto flex items-end justify-between gap-4">
          <div>
            <p className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-2">— Mi cuenta</p>
            <h1 className="text-5xl font-bold text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>MIS TURNOS</h1>
            <p className="text-neutral-500 mt-1 text-sm uppercase tracking-wider">Hola, {session.user.name}</p>
          </div>
          <Link
            href="/turnos/nuevo"
            className="btn-neon shrink-0 px-5 py-2.5 rounded text-xs uppercase tracking-wider font-bold"
          >
            + NUEVO TURNO
          </Link>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {turnos.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-xl bg-[#111111] border border-[#CCFF0020] flex items-center justify-center text-4xl mx-auto mb-6">📅</div>
            <h3 className="text-3xl font-bold mb-2 text-white uppercase" style={{ fontFamily: "Bebas Neue, sans-serif" }}>TODAVÍA NO TENÉS TURNOS</h3>
            <p className="text-neutral-600 mb-8">Reservá tu primer turno y empezá a disfrutar nuestros servicios.</p>
            <Link
              href="/turnos/nuevo"
              className="btn-neon inline-flex items-center gap-2 px-8 py-3 rounded uppercase tracking-wider font-bold"
            >
              RESERVAR MI PRIMER TURNO →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {proximos.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-[#CCFF00] uppercase tracking-widest mb-4">PRÓXIMOS TURNOS</h2>
                <div className="flex flex-col gap-3">
                  {proximos.map((t: TurnoConServicio) => (
                    <TurnoCard key={t.id} turno={t} />
                  ))}
                </div>
              </div>
            )}

            {pasados.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-neutral-600 uppercase tracking-widest mb-4">HISTORIAL</h2>
                <div className="flex flex-col gap-3 opacity-60">
                  {pasados.map((t: TurnoConServicio) => (
                    <TurnoCard key={t.id} turno={t} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TurnoCard({ turno }: { turno: TurnoConServicio }) {
  const cfg = estadoConfig[turno.estado] ?? estadoConfig.PENDIENTE;
  const fecha = new Date(turno.fecha);

  return (
    <div className="neon-border rounded-xl bg-[#111111] p-5 flex items-center justify-between gap-4">
      {/* Date block */}
      <div className="shrink-0 w-14 text-center bg-[#CCFF0010] rounded-lg py-2 border border-[#CCFF0020]">
        <p className="text-xs text-neutral-600 uppercase tracking-wide">
          {fecha.toLocaleDateString("es-AR", { month: "short", timeZone: TZ })}
        </p>
        <p className="text-2xl font-bold text-[#CCFF00] leading-tight" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          {fecha.toLocaleDateString("es-AR", { day: "numeric", timeZone: TZ })}
        </p>
        <p className="text-xs text-neutral-600">
          {fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", timeZone: TZ })}
        </p>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white uppercase tracking-wide truncate">{turno.servicio.nombre}</p>
        <p className="text-sm text-neutral-600">
          {fecha.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ })}
        </p>
        {turno.notas && (
          <p className="text-xs text-neutral-600 mt-1 italic truncate">"{turno.notas}"</p>
        )}
      </div>

      {/* Right side */}
      <div className="shrink-0 flex flex-col items-end gap-2">
        <span className="text-xl font-bold text-[#CCFF00]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          ${turno.servicio.precio.toLocaleString("es-AR")}
        </span>
        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border font-bold uppercase tracking-wider ${cfg.className}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>
    </div>
  );
}
