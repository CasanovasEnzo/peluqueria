import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/Header";

export const metadata: Metadata = {
  title: "CorteStyle — Peluquería Premium",
  description: "Reservá tu turno en CorteStyle. Servicios de peluquería profesional para hombres y mujeres.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <footer className="border-t border-[#8B14FD30] mt-20" style={{ background: "linear-gradient(135deg, #0F0F0F 0%, #080808 100%)" }}>
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-bold text-2xl mb-2 tracking-widest text-gradient-neon" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                CORTESTYLE
              </p>
              <p className="text-sm leading-relaxed text-neutral-500">
                El corte que te define. Más de 10 años en el juego.
              </p>
            </div>
            <div>
              <p className="text-[#8B14FD] text-xs font-bold mb-3 uppercase tracking-widest">Navegación</p>
              <ul className="flex flex-col gap-2 text-sm text-neutral-600">
                <li><a href="/servicios" className="hover:text-[#C084FC] transition uppercase tracking-wider text-xs font-bold">Servicios</a></li>
                <li><a href="/turnos/nuevo" className="hover:text-[#C084FC] transition uppercase tracking-wider text-xs font-bold">Reservar turno</a></li>
                <li><a href="/mis-turnos" className="hover:text-[#C084FC] transition uppercase tracking-wider text-xs font-bold">Mis turnos</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[#FFB800] text-xs font-bold mb-3 uppercase tracking-widest">Contacto</p>
              <ul className="flex flex-col gap-2 text-sm text-neutral-600 uppercase tracking-wider text-xs font-bold">
                <li>📍 Av. Corrientes 1234, CABA</li>
                <li>📞 (011) 4567-8900</li>
                <li>🕐 Lun–Sáb 9:00–19:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#8B14FD20] text-center text-xs py-4 text-neutral-700 uppercase tracking-widest">
            © {new Date().getFullYear()} CORTESTYLE — TODOS LOS DERECHOS RESERVADOS.
          </div>
        </footer>
      </body>
    </html>
  );
}
