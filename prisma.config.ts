import { defineConfig } from "prisma/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
  datasource: {
    url: "file:prisma/dev.db",
    adapter: () => new PrismaLibSql({ url: "file:prisma/dev.db" }),
  },
});
