import { PrismaClient } from "@prisma/client";

// Extend the NodeJS Global interface to include the 'prisma' property
declare global {
  // Add a custom Prisma property to the NodeJS Global interface
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}

const globalForPrisma = global as typeof global & { prisma?: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
