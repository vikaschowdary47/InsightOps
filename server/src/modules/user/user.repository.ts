import { PrismaClient } from "@prisma/client"; // adjust if you use custom generated client
const prisma = new PrismaClient();

export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const createUser = (data: {
  email: string;
  password: string;
  name?: string;
}) => prisma.user.create({ data });
