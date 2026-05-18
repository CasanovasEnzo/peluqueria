"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";

interface Servicio {
  id: string;
  nombre: string;
  precio: number;
  duracion: number;
  descripcion: string | null;
}

const HORARIOS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function NuevoTurnoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending } = useSession();

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [step, setStep] = useState(1);
  const [servicioId, setServicioId] = useState(searchParams.get("servicioId") ?? "");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [notas, setNotas] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/servicios")
      .then((r) => r.json())
      .then(setServicios);
  }, []);

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  useEffect(() => {
    if (servicioId) setStep(2);
  }, [servicioId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/turnos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ servicioId, fecha: `${fecha}T${hora}:00`, notas }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Error al crear el turno.");
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/mis-turnos"), 2500);
    }
    setLoading(false);
  }

  const hoy = new Date().toISOString().split("T")[0];
  const servicioSel = servicios.find((s) => s.id === servicioId);

  if (isPending) return null;

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#0A0A0A]">
        <div className="text-center animate-fade-up">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 bg-[#CCFF00] text-[#0A0A0A]">
            ✓
          </div>
          <h2 className="text-5xl font-bold mb-3 text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>TURNO RESERVADO</h2>
          <p className="text-neutral-500 mb-2">Tu turno fue confirmado correctamente.</p>
          <p className="text-sm text-neutral-600">Redirigiendo a tus turnos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Steps */}
        <div className="flex items-center gap-0 mb-10">
          {["SERVICIO", "FECHA Y HORA", "CONFIRMÁ"].map((label, i) => {
            const n = i + 1;
            const active = step === n;
            const done = step > n;
            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold transition ${
                    done
                      ? "bg-[#CCFF00] text-[#0A0A0A]"
                      : active
                        ? "bg-[#CCFF00] text-[#0A0A0A]"
                        : "bg-[#1A1A1A] text-neutral-600 border border-[#CCFF0020]"
                  }`}>
                    {done ? "✓" : n}
                  </div>
                  <span className={`text-xs mt-1.5 font-bold whitespace-nowrap hidden sm:block uppercase tracking-wider ${active ? "text-[#CCFF00]" : done ? "text-neutral-400" : "text-neutral-700"}`}>
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-0.5 mx-2 transition ${step > n ? "bg-[#CCFF00]" : "bg-[#222222]"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="neon-border rounded-xl bg-[#111111] overflow-hidden">

          {/* Step 1: Servicio */}
          {step === 1 && (
            <div className="p-8">
              <h2 className="text-4xl font-bold mb-1 text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>ELEGÍ UN SERVICIO</h2>
              <p className="text-neutral-500 text-sm mb-7">Seleccioná el servicio que querés reservar.</p>
              <div className="flex flex-col gap-3">
                {servicios.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => { setServicioId(s.id); setStep(2); }}
                    className={`w-full text-left px-5 py-4 rounded-lg border transition flex items-center justify-between ${
                      servicioId === s.id
                        ? "border-[#CCFF00] bg-[#CCFF0008]"
                        : "border-[#CCFF0020] hover:border-[#CCFF0060] hover:bg-[#CCFF0005]"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-white uppercase tracking-wide">{s.nombre}</p>
                      {s.descripcion && <p className="text-xs text-neutral-500 mt-0.5">{s.descripcion}</p>}
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="font-bold text-[#CCFF00] text-xl" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                        ${s.precio.toLocaleString("es-AR")}
                      </p>
                      <p className="text-xs text-neutral-600">{s.duracion} min</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Fecha y hora */}
          {step === 2 && (
            <div className="p-8">
              {servicioSel && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#CCFF00] transition mb-6 uppercase tracking-wider font-bold"
                >
                  ← {servicioSel.nombre}
                </button>
              )}
              <h2 className="text-4xl font-bold mb-1 text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>ELEGÍ FECHA Y HORA</h2>
              <p className="text-neutral-500 text-sm mb-7">¿Cuándo querés venir?</p>

              <div className="mb-6">
                <label className="block text-xs font-bold mb-2 text-[#CCFF00] uppercase tracking-wider">Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  min={hoy}
                  required
                  className="w-full border border-[#CCFF0030] rounded-lg px-4 py-3 text-sm bg-[#1A1A1A] text-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-3 text-[#CCFF00] uppercase tracking-wider">Horario disponible</label>
                <div className="grid grid-cols-3 gap-2">
                  {HORARIOS.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHora(h)}
                      className={`py-3 rounded-lg text-sm font-bold border transition uppercase tracking-wider ${
                        hora === h
                          ? "bg-[#CCFF00] text-[#0A0A0A] border-[#CCFF00]"
                          : "border-[#CCFF0020] text-neutral-500 hover:border-[#CCFF0060] hover:text-white bg-[#1A1A1A]"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={!fecha || !hora}
                onClick={() => setStep(3)}
                className="btn-neon w-full mt-8 py-3.5 rounded uppercase tracking-wider font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                CONTINUAR →
              </button>
            </div>
          )}

          {/* Step 3: Confirmar */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="p-8">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#CCFF00] transition mb-6 uppercase tracking-wider font-bold"
              >
                ← Volver
              </button>
              <h2 className="text-4xl font-bold mb-1 text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>CONFIRMÁ TU TURNO</h2>
              <p className="text-neutral-500 text-sm mb-7">Revisá los detalles antes de confirmar.</p>

              {error && (
                <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">{error}</div>
              )}

              {/* Resumen */}
              <div className="bg-[#1A1A1A] rounded-xl p-5 mb-6 border border-[#CCFF0020]">
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Servicio", value: servicioSel?.nombre },
                    { label: "Fecha", value: new Date(`${fecha}T12:00:00`).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" }) },
                    { label: "Hora", value: hora },
                    { label: "Duración", value: `${servicioSel?.duracion} min` },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-neutral-600 uppercase tracking-wider text-xs">{row.label}</span>
                      <span className="font-bold text-white">{row.value}</span>
                    </div>
                  ))}
                  <div className="border-t border-[#CCFF0015] pt-3 flex justify-between items-center">
                    <span className="font-bold uppercase tracking-wider text-xs text-neutral-500">Total</span>
                    <span className="text-3xl font-bold text-[#CCFF00]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                      ${servicioSel?.precio.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold mb-2 text-[#CCFF00] uppercase tracking-wider">
                  Notas para el estilista <span className="text-neutral-600 font-normal">(opcional)</span>
                </label>
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={3}
                  className="w-full border border-[#CCFF0030] rounded-lg px-4 py-3 text-sm resize-none bg-[#1A1A1A] text-white transition"
                  placeholder="Ej: quiero un degradado suave..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-neon w-full py-4 rounded uppercase tracking-wider font-bold disabled:opacity-50"
              >
                {loading ? "RESERVANDO..." : "CONFIRMAR RESERVA"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
