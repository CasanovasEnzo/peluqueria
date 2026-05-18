"use client";

import { useState } from "react";

const ESTADOS = ["PENDIENTE", "CONFIRMADO", "CANCELADO", "COMPLETADO"] as const;

const estadoColor: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-800",
  CONFIRMADO: "bg-green-100 text-green-800",
  CANCELADO: "bg-red-100 text-red-800",
  COMPLETADO: "bg-neutral-100 text-neutral-600",
};

export default function TurnoStatusSelect({
  turnoId,
  currentStatus,
}: {
  turnoId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  async function handleChange(newStatus: string) {
    setSaving(true);
    await fetch(`/api/turnos/${turnoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: newStatus }),
    });
    setStatus(newStatus);
    setSaving(false);
  }

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={saving}
      className={`text-xs px-2 py-1 rounded-full font-medium border-0 focus:outline-none focus:ring-2 focus:ring-amber-400 ${estadoColor[status]}`}
    >
      {ESTADOS.map((e) => (
        <option key={e} value={e}>{e}</option>
      ))}
    </select>
  );
}
