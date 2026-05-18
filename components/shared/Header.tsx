"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-md border-[#8B14FD40]"
          : "bg-[#080808] border-[#8B14FD20]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-[#CCFF00] text-xl font-bold tracking-widest group-hover:text-[#FFB800] transition" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            CORTESTYLE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "/servicios", label: "Servicios" },
            { href: "/turnos/nuevo", label: "Reservar" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition uppercase tracking-wider ${
                isActive(item.href)
                  ? "text-[#CCFF00] bg-[#CCFF0010]"
                  : "text-neutral-500 hover:text-[#C084FC] hover:bg-[#8B14FD10]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {session?.user ? (
            <>
              <Link
                href="/mis-turnos"
                className={`px-4 py-2 rounded-lg text-sm font-bold transition uppercase tracking-wider ${
                  isActive("/mis-turnos")
                    ? "text-[#CCFF00] bg-[#CCFF0010]"
                    : "text-neutral-500 hover:text-[#C084FC] hover:bg-[#8B14FD10]"
                }`}
              >
                Mis turnos
              </Link>
              {session.user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="px-4 py-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition uppercase tracking-wider"
                >
                  Admin
                </Link>
              )}
              <div className="ml-2 flex items-center gap-3">
                <span className="text-xs text-neutral-600 hidden lg:block uppercase tracking-widest">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-xs px-4 py-1.5 rounded border border-white/10 text-neutral-500 hover:border-red-500/50 hover:text-red-400 transition uppercase tracking-wider"
                >
                  Salir
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link
                href="/login"
                className="text-xs px-4 py-1.5 rounded border border-white/10 text-neutral-400 hover:border-white/30 hover:text-white transition uppercase tracking-wider"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                className="btn-neon text-xs px-5 py-2 rounded uppercase tracking-wider"
              >
                Registrarse
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className={`block h-0.5 bg-[#CCFF00] transition-all duration-300 ${menuOpen ? "w-5 rotate-45 translate-y-2" : "w-5"}`} />
          <span className={`block h-0.5 bg-[#CCFF00] transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
          <span className={`block h-0.5 bg-[#CCFF00] transition-all duration-300 ${menuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-5"}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80" : "max-h-0"}`}>
        <nav className="bg-[#111111] border-t border-[#CCFF0015] px-6 pb-5 pt-2 flex flex-col gap-1">
          {[
            { href: "/servicios", label: "Servicios" },
            { href: "/turnos/nuevo", label: "Reservar" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded text-sm text-neutral-400 hover:text-[#CCFF00] hover:bg-[#CCFF0008] transition uppercase tracking-wider"
            >
              {item.label}
            </Link>
          ))}
          {session?.user ? (
            <>
              <Link href="/mis-turnos" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded text-sm text-neutral-400 hover:text-[#CCFF00] hover:bg-[#CCFF0008] transition uppercase tracking-wider">
                Mis turnos
              </Link>
              {session.user.role === "ADMIN" && (
                <Link href="/admin" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded text-sm text-neutral-400 hover:text-[#CCFF00] hover:bg-[#CCFF0008] transition uppercase tracking-wider">
                  Admin
                </Link>
              )}
              <button onClick={() => signOut()} className="text-left px-3 py-2.5 text-sm text-red-400 hover:bg-white/5 rounded transition mt-1 uppercase tracking-wider">
                Cerrar sesión
              </button>
            </>
          ) : (
            <div className="flex gap-2 mt-2">
              <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2 rounded border border-white/10 text-xs text-neutral-400 uppercase tracking-wider">
                Iniciar sesión
              </Link>
              <Link href="/registro" onClick={() => setMenuOpen(false)} className="btn-neon flex-1 text-center py-2 rounded text-xs uppercase tracking-wider">
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
