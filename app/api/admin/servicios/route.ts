import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { nombre, descripcion, precio, duracion } = await req.json();

  const servicio = await prisma.servicio.create({
    data: { nombre, descripcion, precio, duracion },
  });

  return NextResponse.json(servicio, { status: 201 });
}
