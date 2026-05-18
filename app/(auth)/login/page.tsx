"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn.email({ email, password });
    if (res.error) {
      setError("Email o contraseña incorrectos.");
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
          <p className="text-5xl font-bold leading-tight text-white mb-6" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            "EL CORTE
            <br />
            <span className="text-[#CCFF00]">QUE TE DEFINE."</span>
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#CCFF0020] flex items-center justify-center text-[#CCFF00] text-lg">✂</div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider">CorteStyle</p>
              <p className="text-xs text-neutral-600 uppercase tracking-widest">Peluquería Premium · CABA</p>
            </div>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-3">
          {["10+", "1.2K", "4.9★"].map((v, i) => (
            <div key={i} className="neon-border rounded-lg p-3 text-center bg-[#0A0A0A]">
              <p className="text-[#CCFF00] font-bold text-2xl" style={{ fontFamily: "Bebas Neue, sans-serif" }}>{v}</p>
              <p className="text-xs text-neutral-600 uppercase tracking-wider">{["Años", "Clientes", "Rating"][i]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Panel derecho */}
      <div className="flex items-center justify-center px-6 py-12 bg-[#0A0A0A]">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="md:hidden text-[#CCFF00] font-bold tracking-widest text-xl block mb-6" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              CORTESTYLE
            </Link>
            <h1 className="text-5xl font-bold mb-1 text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>BIENVENIDO</h1>
            <p className="text-neutral-500 text-sm">Ingresá a tu cuenta para gestionar tus turnos.</p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                className="w-full border border-[#CCFF0030] rounded-lg px-4 py-3 text-sm bg-[#111111] text-white transition"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-neon mt-2 w-full py-4 rounded uppercase tracking-wider font-bold disabled:opacity-50"
            >
              {loading ? "INGRESANDO..." : "INGRESAR"}
            </button>
          </form>

          <p className="text-sm text-center text-neutral-600 mt-8">
            ¿No tenés cuenta?{" "}
            <Link href="/registro" className="font-bold text-[#CCFF00] hover:text-white transition">
              Registrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
