import { prisma } from "@/lib/prisma";
import ServicioForm from "./ServicioForm";

export default async function AdminServiciosPage() {
  const servicios = await prisma.servicio.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Gestión de Servicios</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Agregar servicio</h2>
          <ServicioForm />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Servicios existentes</h2>
          <div className="flex flex-col gap-3">
            {servicios.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-xl border border-neutral-100 shadow-sm px-5 py-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{s.nombre}</div>
                  <div className="text-sm text-neutral-500">${s.precio} · {s.duracion} min</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.activo ? "bg-green-100 text-green-800" : "bg-neutral-100 text-neutral-500"}`}>
                  {s.activo ? "Activo" : "Inactivo"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
