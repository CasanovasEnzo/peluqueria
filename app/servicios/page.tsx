import { prisma } from "@/lib/prisma";
import Link from "next/link";

const iconosPorNombre: Record<string, string> = {
  "Corte de cabello": "✂️",
  "Corte + Barba": "🪒",
  "Coloración": "🎨",
  "Mechas": "✨",
  "Tratamiento capilar": "💆",
  "Peinado": "💇",
};

export default async function ServiciosPage() {
  const servicios = await prisma.servicio.findMany({
    where: { activo: true },
    orderBy: { precio: "asc" },
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-[#0A0A0A] text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, #CCFF0008 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#CCFF00 1px, transparent 1px), linear-gradient(90deg, #CCFF00 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="relative max-w-2xl mx-auto">
          <div className="tag-neon inline-flex px-3 py-1 rounded mb-4 animate-fade-up">
            LO QUE OFRECEMOS
          </div>
          <h1 className="text-6xl md:text-7xl mb-4 animate-fade-up-delay-1" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            NUESTROS SERVICIOS
          </h1>
          <p className="text-neutral-500 text-lg animate-fade-up-delay-2">
            Desde un corte clásico hasta una transformación completa.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        {servicios.length === 0 ? (
          <div className="text-center py-20 text-neutral-600">
            <p className="text-5xl mb-4">✂️</p>
            <p className="text-lg font-bold uppercase tracking-wider">No hay servicios disponibles por el momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicios.map((s, i) => (
              <div
                key={s.id}
                className="group neon-border rounded-xl bg-[#111111] flex flex-col overflow-hidden card-hover"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-5 bg-[#CCFF0010]">
                    {iconosPorNombre[s.nombre] ?? "✂️"}
                  </div>

                  <h2 className="text-2xl font-bold mb-2 text-white uppercase tracking-wide" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                    {s.nombre}
                  </h2>
                  {s.descripcion && (
                    <p className="text-neutral-500 text-sm leading-relaxed flex-1">{s.descripcion}</p>
                  )}

                  <div className="mt-5 mb-4">
                    <span className="tag-neon inline-flex px-3 py-1 rounded">
                      ⏱ {s.duracion} min
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[#CCFF0015] flex items-center justify-between gap-3">
                    <span className="text-3xl font-bold text-[#CCFF00]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                      ${s.precio.toLocaleString("es-AR")}
                    </span>
                    <Link
                      href={`/turnos/nuevo?servicioId=${s.id}`}
                      className="btn-neon px-5 py-2 rounded text-xs uppercase tracking-wider"
                    >
                      RESERVAR
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center neon-border rounded-2xl px-8 py-12 bg-[#111111]">
          <p className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-3">¿Dudas?</p>
          <h3 className="text-4xl font-bold text-white mb-3 uppercase" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            ¿NO ENCONTRÁS LO QUE BUSCÁS?
          </h3>
          <p className="text-neutral-500 mb-6 text-sm">Contactanos y te ayudamos a encontrar el servicio ideal.</p>
          <a
            href="tel:01145678900"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded border border-[#CCFF0030] text-[#CCFF00] text-sm hover:bg-[#CCFF0010] transition uppercase tracking-wider font-bold"
          >
            📞 (011) 4567-8900
          </a>
        </div>
      </section>
    </div>
  );
}
