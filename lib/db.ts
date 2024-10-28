import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare the global variable for the Prisma Client
declare const globalThis: {
  prismaGlobal?: PrismaClient; // Make this optional
} & typeof global;

// Use the global variable or create a new PrismaClient instance
const db = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = db; // Assign the global variable
}

// Export the db variable
export default db;
