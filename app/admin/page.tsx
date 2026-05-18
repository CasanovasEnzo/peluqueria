import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface TurnoAdmin {
  id: string;
  fecha: Date;
  estado: string;
  user: { name: string; email: string };
  servicio: { nombre: string; precio: number };
}

export default async function AdminDashboard() {
  const [totalTurnos, turnosPendientes, totalClientes, totalServicios] = await Promise.all([
    prisma.turno.count(),
    prisma.turno.count({ where: { estado: "PENDIENTE" } }),
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.servicio.count({ where: { activo: true } }),
  ]);

  const turnosRecientes = await prisma.turno.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { user: true, servicio: true },
  });

  const stats = [
    { label: "Total turnos", value: totalTurnos, icon: "📅", href: "/admin/turnos" },
    { label: "Pendientes", value: turnosPendientes, icon: "⏳", href: "/admin/turnos" },
    { label: "Clientes", value: totalClientes, icon: "👤", href: "/admin/clientes" },
    { label: "Servicios activos", value: totalServicios, icon: "✂️", href: "/admin/servicios" },
  ];

  const estadoColor: Record<string, string> = {
    PENDIENTE:  "bg-yellow-900/20 text-yellow-400 border border-yellow-500/30",
    CONFIRMADO: "bg-[#CCFF0010] text-[#CCFF00] border border-[#CCFF0030]",
    CANCELADO:  "bg-red-900/20 text-red-400 border border-red-500/30",
    COMPLETADO: "bg-white/5 text-neutral-500 border border-white/10",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>DASHBOARD</h1>
        <p className="text-neutral-600 text-xs uppercase tracking-widest mt-1">
          {new Date().toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="neon-border rounded-xl bg-[#111111] p-5 card-hover block"
          >
            <div className="text-2xl mb-3">{s.icon}</div>
            <p className="text-4xl font-bold text-[#CCFF00]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>{s.value}</p>
            <p className="text-xs text-neutral-600 mt-0.5 uppercase tracking-wider">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent turnos */}
      <div className="neon-border rounded-xl bg-[#111111] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#CCFF0015] flex items-center justify-between">
          <h2 className="font-bold text-white uppercase tracking-wider" style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "1.2rem" }}>
            ÚLTIMOS TURNOS
          </h2>
          <Link href="/admin/turnos" className="text-xs text-[#CCFF00] hover:text-white transition font-bold uppercase tracking-wider">
            Ver todos →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0A0A0A] text-neutral-600 text-left border-b border-[#CCFF0015]">
              <tr>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-xs">Cliente</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-xs">Servicio</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-xs">Fecha</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-xs">Precio</th>
                <th className="px-6 py-3 font-bold uppercase tracking-wider text-xs">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CCFF0008]">
              {turnosRecientes.map((t: TurnoAdmin) => (
                <tr key={t.id} className="hover:bg-[#CCFF0005] transition">
                  <td className="px-6 py-3.5">
                    <p className="font-bold text-white uppercase tracking-wide text-xs">{t.user.name}</p>
                    <p className="text-xs text-neutral-600">{t.user.email}</p>
                  </td>
                  <td className="px-6 py-3.5 text-neutral-400">{t.servicio.nombre}</td>
                  <td className="px-6 py-3.5 text-neutral-600 text-xs">
                    {new Date(t.fecha).toLocaleDateString("es-AR")}
                    {" · "}
                    {new Date(t.fecha).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-6 py-3.5 font-bold text-[#CCFF00]" style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "1.1rem" }}>
                    ${t.servicio.precio.toLocaleString("es-AR")}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider ${estadoColor[t.estado]}`}>
                      {t.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
