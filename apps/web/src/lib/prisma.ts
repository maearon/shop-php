import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Augment the global object using module-style syntax
declare global {
  // Use interface merging without namespace
  interface GlobalThis {
    prismaGlobal?: ReturnType<typeof prismaClientSingleton>;
  }
}

const prisma = (globalThis as GlobalThis).prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  (globalThis as GlobalThis).prismaGlobal = prisma;
}

export default prisma;
