import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.servicio.count();
  if (count > 0) {
    console.log("La base de datos ya tiene servicios, omitiendo seed.");
    return;
  }

  await prisma.servicio.createMany({
    data: [
      { nombre: "Corte de cabello", descripcion: "Corte personalizado para hombres o mujeres.", precio: 2500, duracion: 30 },
      { nombre: "Corte + Barba", descripcion: "Corte de pelo y arreglo de barba completo.", precio: 3500, duracion: 45 },
      { nombre: "Coloración", descripcion: "Tintura completa con productos de primera calidad.", precio: 6000, duracion: 90 },
      { nombre: "Mechas", descripcion: "Mechas o balayage con acabado profesional.", precio: 8000, duracion: 120 },
      { nombre: "Tratamiento capilar", descripcion: "Hidratación profunda y keratina para el cabello.", precio: 5000, duracion: 60 },
      { nombre: "Peinado", descripcion: "Peinado para eventos, graduaciones o uso diario.", precio: 3000, duracion: 45 },
    ],
  });

  console.log("Seed completado: 6 servicios creados.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
