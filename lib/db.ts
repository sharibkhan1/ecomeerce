import { PrismaClient } from "@prisma/client";

// Augment the global namespace directly instead of using a namespace
declare global {
  var prisma: PrismaClient | undefined; // Declare the prisma property on the global object
}

const globalForPrisma = global as typeof global & { prisma?: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();
