import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const turnos = await prisma.turno.findMany({
    where: { userId: session.user.id },
    include: { servicio: true },
    orderBy: { fecha: "desc" },
  });
  return NextResponse.json(turnos);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { servicioId, fecha, notas } = await req.json();

  if (!servicioId || !fecha) {
    return NextResponse.json({ error: "Servicio y fecha son obligatorios" }, { status: 400 });
  }

  const turno = await prisma.turno.create({
    data: {
      userId: session.user.id,
      servicioId,
      fecha: new Date(fecha),
      notas: notas ?? null,
    },
    include: { servicio: true },
  });

  return NextResponse.json(turno, { status: 201 });
}
