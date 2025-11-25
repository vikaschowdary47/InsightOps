import { PrismaClient } from "../../generated/prisma/client";
import { UserLogin } from "./user.model";
import bcrypt from "bcrypt";

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
      // return;
      if (existingUser) {
        return { error: "User already exists" };
      }
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      // Create user
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return newUser;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async userCreate() {},
};
