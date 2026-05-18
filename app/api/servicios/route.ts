import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const servicios = await prisma.servicio.findMany({
    where: { activo: true },
    orderBy: { precio: "asc" },
  });
  return NextResponse.json(servicios);
}
