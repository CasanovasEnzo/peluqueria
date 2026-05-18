import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/turnos", label: "Turnos", icon: "📅" },
  { href: "/admin/servicios", label: "Servicios", icon: "✂️" },
  { href: "/admin/clientes", label: "Clientes", icon: "👤" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#111111] border-r border-[#CCFF0015] text-white flex flex-col shrink-0">
        <div className="px-6 py-5 border-b border-[#CCFF0015]">
          <Link href="/" className="text-[#CCFF00] font-bold tracking-widest text-lg" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            CORTESTYLE
          </Link>
          <p className="text-xs text-neutral-600 mt-0.5 uppercase tracking-widest">Panel de administración</p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-500 hover:text-[#CCFF00] hover:bg-[#CCFF0008] transition uppercase tracking-wider font-bold"
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-[#CCFF0015]">
          <Link href="/" className="text-xs text-neutral-600 hover:text-[#CCFF00] transition flex items-center gap-1.5 uppercase tracking-wider font-bold">
            ← VOLVER AL SITIO
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-8 py-8">{children}</div>
      </div>
    </div>
  );
}
