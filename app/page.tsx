export const dynamic = 'force-dynamic';

import Link from "next/link";
import { prisma } from "@/lib/prisma";

const iconosPorNombre: Record<string, string> = {
  "Corte de cabello": "✂️",
  "Corte + Barba": "🪒",
  "Coloración": "🎨",
  "Mechas": "✨",
  "Tratamiento capilar": "💆",
  "Peinado": "💇",
};

export default async function Home() {
  const serviciosDB = await prisma.servicio.findMany({
    where: { activo: true },
    orderBy: { precio: "asc" },
    take: 3,
  });

  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section className="relative bg-[#080808] text-white overflow-hidden min-h-[92vh] flex items-center">
        {/* Purple glow top-right */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #8B14FD25 0%, transparent 60%)", transform: "translate(20%, -20%)" }}
        />
        {/* Neon glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #CCFF0012 0%, transparent 60%)", transform: "translate(-20%, 20%)" }}
        />
        {/* Gold glow center */}
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #FFB80008 0%, transparent 70%)", transform: "translate(-50%, -50%)" }}
        />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#8B14FD 1px, transparent 1px), linear-gradient(90deg, #8B14FD 1px, transparent 1px)", backgroundSize: "80px 80px" }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="tag-purple inline-flex px-3 py-1 rounded mb-6 animate-fade-up">
                ✦ PELUQUERÍA PREMIUM · BUENOS AIRES
              </div>

              {/* Big title */}
              <h1 className="leading-none mb-6 animate-fade-up-delay-1" style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(4rem, 10vw, 7rem)" }}>
                EL CORTE
                <br />
                <span className="text-gradient-neon">QUE TE</span>
                <br />
                <span style={{ color: "#FFB800" }}>DEFINE.</span>
              </h1>

              <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-md animate-fade-up-delay-2">
                Reservá tu turno en segundos. Sin llamadas, sin esperas. Profesionales que entienden tu estilo.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 animate-fade-up-delay-3">
                <Link
                  href="/turnos/nuevo"
                  className="btn-neon inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg uppercase tracking-wider font-bold text-sm"
                >
                  RESERVAR TURNO →
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[#8B14FD50] text-[#C084FC] hover:bg-[#8B14FD15] hover:border-[#8B14FD90] transition uppercase tracking-wider text-sm font-bold"
                >
                  VER SERVICIOS
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden md:grid grid-cols-2 gap-4 animate-fade-up-delay-2">
              {stats.map((s, i) => (
                <div key={s.label} className={`rounded-xl p-6 border ${
                  i === 0 ? "bg-[#8B14FD15] border-[#8B14FD40]" :
                  i === 1 ? "bg-[#CCFF0008] border-[#CCFF0030]" :
                  i === 2 ? "bg-[#FFB80008] border-[#FFB80030]" :
                  "bg-[#FF2D8B08] border-[#FF2D8B30]"
                }`}>
                  <p className={`text-5xl font-bold mb-1 ${
                    i === 0 ? "text-[#C084FC]" :
                    i === 1 ? "text-[#CCFF00]" :
                    i === 2 ? "text-[#FFB800]" :
                    "text-[#FF2D8B]"
                  }`} style={{ fontFamily: "Bebas Neue, sans-serif" }}>{s.value}</p>
                  <p className="text-xs text-neutral-600 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS MOBILE ── */}
      <section className="md:hidden bg-[#0F0F0F] border-y border-white/5 px-6 py-8">
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center">
              <p className={`text-4xl font-bold ${
                i === 0 ? "text-[#C084FC]" : i === 1 ? "text-[#CCFF00]" : i === 2 ? "text-[#FFB800]" : "text-[#FF2D8B]"
              }`} style={{ fontFamily: "Bebas Neue, sans-serif" }}>{s.value}</p>
              <p className="text-xs text-neutral-600 mt-0.5 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-[#FFB800] text-xs font-bold tracking-widest uppercase mb-3">— LO QUE OFRECEMOS</p>
            <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)" }}>
              NUESTROS <span className="text-gradient-neon">SERVICIOS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviciosDB.map((s, i) => (
              <Link
                key={s.id}
                href={`/turnos/nuevo?servicioId=${s.id}`}
                className={`group relative rounded-xl p-6 border transition card-hover ${
                  i === 0
                    ? "bg-[#8B14FD] border-[#8B14FD] text-white"
                    : i === 1
                    ? "bg-[#0F0F0F] border-[#FFB80030] hover:border-[#FFB80070]"
                    : "bg-[#0F0F0F] border-[#CCFF0020] hover:border-[#CCFF0060]"
                }`}
              >
                <div className="text-3xl mb-5">{iconosPorNombre[s.nombre] ?? "✂️"}</div>
                <h3 className="font-bold text-2xl mb-1 uppercase tracking-wide"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  {s.nombre}
                </h3>
                <p className={`text-sm leading-relaxed ${i === 0 ? "text-purple-200" : "text-neutral-500"}`}>
                  {s.descripcion}
                </p>
                <div className={`mt-5 pt-4 border-t flex items-center justify-between ${
                  i === 0 ? "border-white/20" : i === 1 ? "border-[#FFB80015]" : "border-[#CCFF0015]"
                }`}>
                  <span className={`text-3xl font-bold ${
                    i === 0 ? "text-[#CCFF00]" : i === 1 ? "text-[#FFB800]" : "text-[#CCFF00]"
                  }`} style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                    ${s.precio.toLocaleString("es-AR")}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-neutral-600">{s.duracion} min</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-[#CCFF00] transition uppercase tracking-wider"
            >
              VER TODOS LOS SERVICIOS →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PURPLE BANNER ── */}
      <section className="py-16 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3B0764 0%, #8B14FD 50%, #6D28D9 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#CCFF00 1px, transparent 1px), linear-gradient(90deg, #CCFF00 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-2">SIN FILAS, SIN LLAMADAS</p>
            <h2 className="text-white" style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
              RESERVÁ ONLINE EN <span className="text-[#CCFF00]">1 MINUTO</span>
            </h2>
          </div>
          <Link
            href="/turnos/nuevo"
            className="btn-neon shrink-0 px-10 py-4 rounded-lg uppercase tracking-wider font-bold text-sm animate-pulse-neon"
          >
            RESERVAR AHORA →
          </Link>
        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS ── */}
      <section className="py-24 px-6 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-3">— ¿POR QUÉ NOSOTROS?</p>
            <h2 className="mb-6" style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(3rem, 7vw, 4.5rem)" }}>
              EXPERIENCIA
              <br />
              <span style={{ color: "#FFB800" }}>QUE SE NOTA.</span>
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              Desde que entrás hasta que salís, cada detalle está pensado para que te vayas sintiéndote diferente.
            </p>
            <Link
              href="/turnos/nuevo"
              className="btn-purple inline-flex items-center gap-2 px-8 py-4 rounded-lg uppercase tracking-wider text-sm font-bold"
            >
              RESERVAR AHORA →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {features.map((f, i) => (
              <div key={f.title} className={`flex gap-4 items-start p-5 rounded-xl border transition ${
                i === 0 ? "border-[#8B14FD30] bg-[#8B14FD08] hover:border-[#8B14FD60]" :
                i === 1 ? "border-[#CCFF0020] bg-[#CCFF0005] hover:border-[#CCFF0050]" :
                "border-[#FFB80020] bg-[#FFB80005] hover:border-[#FFB80050]"
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-xl ${
                  i === 0 ? "bg-[#8B14FD20]" : i === 1 ? "bg-[#CCFF0015]" : "bg-[#FFB80015]"
                }`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-0.5 uppercase tracking-wide text-white" style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "1.1rem" }}>{f.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-28 px-6 bg-[#080808] relative overflow-hidden">
        {/* Triple glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8B14FD20 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle, #CCFF0015 0%, transparent 70%)" }}
        />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 pointer-events-none"
          style={{ background: "radial-gradient(circle, #FFB80010 0%, transparent 70%)", transform: "translate(-50%,-50%)" }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="tag-gold inline-flex px-3 py-1 rounded mb-6">✦ EMPEZÁ HOY</div>
          <h2 className="text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(3.5rem, 10vw, 7rem)", lineHeight: 0.95 }}>
            ¿LISTO PARA
            <br />
            <span className="text-gradient-neon">TU NUEVO</span>
            <br />
            <span style={{ color: "#FFB800" }}>LOOK?</span>
          </h2>
          <p className="text-neutral-500 text-lg mb-10">
            Elegí el servicio, el día y la hora. Sin llamadas, sin esperas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/turnos/nuevo"
              className="btn-neon inline-flex items-center justify-center gap-2 px-12 py-4 rounded-lg text-sm uppercase tracking-wider font-bold"
            >
              RESERVAR MI TURNO →
            </Link>
            <Link
              href="/registro"
              className="btn-purple inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-sm uppercase tracking-wider font-bold"
            >
              CREAR CUENTA GRATIS
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

const stats = [
  { value: "10+", label: "Años en el juego" },
  { value: "1.2K", label: "Clientes satisfechos" },
  { value: "6", label: "Servicios disponibles" },
  { value: "4.9★", label: "Calificación promedio" },
];

const features = [
  {
    icon: "👑",
    title: "Estilistas profesionales",
    desc: "Nuestro equipo en constante capacitación en las últimas tendencias.",
  },
  {
    icon: "📱",
    title: "Reserva 100% online",
    desc: "Sacá tu turno desde el celular en menos de un minuto, sin llamadas.",
  },
  {
    icon: "💰",
    title: "Productos premium",
    desc: "Solo trabajamos con marcas de primera línea para el mejor resultado.",
  },
];
