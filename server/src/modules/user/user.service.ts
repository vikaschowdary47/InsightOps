import { PrismaClient } from "../../generated/prisma/client";
import { UserLogin } from "./user.model";

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const userService = {
  async userLogin(body: UserLogin) {
    try {
      const { email, password } = body;

      // Check if user exists
      const existingUser = await findUserByEmail(email);
      console.log({ existingUser });
      return;
      if (existingUser) {
        return { error: "User already exists" };
      }

      // Create user
      const newUser = await prisma.user.create({
        data: {
          email,
          password, // Note: hash passwords in real apps!
        },
      });

      return newUser;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
