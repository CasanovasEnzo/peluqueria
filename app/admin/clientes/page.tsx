import { prisma } from "@/lib/prisma";

export default async function AdminClientesPage() {
  const clientes = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { turnos: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Clientes</h1>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Nombre</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Turnos</th>
              <th className="px-5 py-3 font-medium">Registrado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {clientes.map((c: (typeof clientes)[number]) => (
              <tr key={c.id}>
                <td className="px-5 py-3 font-medium">{c.name}</td>
                <td className="px-5 py-3 text-neutral-500">{c.email}</td>
                <td className="px-5 py-3">
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-medium">
                    {c._count.turnos} turno{c._count.turnos !== 1 ? "s" : ""}
                  </span>
                </td>
                <td className="px-5 py-3 text-neutral-500">
                  {new Date(c.createdAt).toLocaleDateString("es-AR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
