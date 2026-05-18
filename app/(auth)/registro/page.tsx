"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegistroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signUp.email({ name, email, password });
    if (res.error) {
      setError(res.error.message ?? "Error al registrarse. Intentá de nuevo.");
    } else {
      router.push("/mis-turnos");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Panel izquierdo */}
      <div className="hidden md:flex flex-col justify-between p-12 bg-[#111111] border-r border-[#CCFF0015] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#CCFF00 1px, transparent 1px), linear-gradient(90deg, #CCFF00 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <Link href="/" className="relative text-[#CCFF00] font-bold tracking-widest text-xl" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          CORTESTYLE
        </Link>
        <div className="relative">
          <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            RESERVÁ TU
            <br />
            <span className="text-[#CCFF00]">TURNO EN</span>
            <br />
            SEGUNDOS.
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              "Elegí el servicio que querés",
              "Seleccioná día y hora disponible",
              "Confirmá y listo — sin llamadas",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-neutral-400">
                <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-[#0A0A0A] bg-[#CCFF00]"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-neutral-700 uppercase tracking-widest">© {new Date().getFullYear()} CORTESTYLE</p>
      </div>

      {/* Panel derecho */}
      <div className="flex items-center justify-center px-6 py-12 bg-[#0A0A0A]">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="md:hidden text-[#CCFF00] font-bold tracking-widest text-xl block mb-6" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              CORTESTYLE
            </Link>
            <h1 className="text-5xl font-bold mb-1 text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>CREAR CUENTA</h1>
            <p className="text-neutral-500 text-sm">Registrate gratis y empezá a reservar turnos.</p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-[#CCFF00] uppercase tracking-wider">Nombre completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-[#CCFF0030] rounded-lg px-4 py-3 text-sm bg-[#111111] text-white transition"
                placeholder="Juan García"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1.5 text-[#CCFF00] uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-[#CCFF0030] rounded-lg px-4 py-3 text-sm bg-[#111111] text-white transition"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1.5 text-[#CCFF00] uppercase tracking-wider">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full border border-[#CCFF0030] rounded-lg px-4 py-3 text-sm bg-[#111111] text-white transition"
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-neon mt-2 w-full py-4 rounded uppercase tracking-wider font-bold disabled:opacity-50"
            >
              {loading ? "CREANDO CUENTA..." : "CREAR CUENTA GRATIS"}
            </button>
          </form>

          <p className="text-xs text-center text-neutral-700 mt-4 uppercase tracking-wider">
            Al registrarte aceptás nuestros términos y condiciones.
          </p>

          <p className="text-sm text-center text-neutral-600 mt-6">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="font-bold text-[#CCFF00] hover:text-white transition">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
