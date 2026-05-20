export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import TurnoStatusSelect from "./TurnoStatusSelect";

export default async function AdminTurnosPage() {
  const turnos = await prisma.turno.findMany({
    orderBy: { fecha: "desc" },
    include: { user: true, servicio: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Gestión de Turnos</h1>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">Servicio</th>
              <th className="px-5 py-3 font-medium">Fecha y hora</th>
              <th className="px-5 py-3 font-medium">Precio</th>
              <th className="px-5 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {turnos.map((t) => (
              <tr key={t.id}>
                <td className="px-5 py-3">
                  <div className="font-medium">{t.user.name}</div>
                  <div className="text-xs text-neutral-400">{t.user.email}</div>
                </td>
                <td className="px-5 py-3">{t.servicio.nombre}</td>
                <td className="px-5 py-3">
                  {new Date(t.fecha).toLocaleDateString("es-AR")}{" "}
                  {new Date(t.fecha).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
                </td>
                <td className="px-5 py-3 font-semibold">${t.servicio.precio}</td>
                <td className="px-5 py-3">
                  <TurnoStatusSelect turnoId={t.id} currentStatus={t.estado} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
