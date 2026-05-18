"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ServicioForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion, setDuracion] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/admin/servicios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, descripcion, precio: parseFloat(precio), duracion: parseInt(duracion) }),
    });

    setSuccess(true);
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setDuracion("");
    setLoading(false);
    router.refresh();
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
      {success && (
        <div className="bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">
          Servicio creado correctamente.
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Ej: Corte de cabello"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={2}
            className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            placeholder="Descripción del servicio..."
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Precio ($)</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              min="0"
              step="0.01"
              className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="2500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duración (min)</label>
            <input
              type="number"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              required
              min="1"
              className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="30"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-neutral-900 text-white font-semibold py-2.5 rounded-full hover:bg-neutral-700 transition disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Agregar servicio"}
        </button>
      </form>
    </div>
  );
}
