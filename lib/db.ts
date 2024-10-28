import { PrismaClient } from "@prisma/client";

// Declare the prisma client globally to avoid reinitializing it in development mode
declare global {
    // This is necessary for TypeScript to recognize 'globalThis.prisma'
    var prisma: PrismaClient | undefined;
}

// Use 'const' to define the database client
export const db = globalThis.prisma || new PrismaClient();

// Assign the Prisma client to the global object in development mode to avoid multiple instances
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
