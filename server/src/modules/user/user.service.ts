import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "./user.repository";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../../utils/jwt";

export const authService = {
  async signup({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name?: string;
  }) {
    const existing = await findUserByEmail(email);
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashed, name });
    const { password: _p, ...safe } = user as any;
    return safe;
  },

  async login({ email, password }: { email: string; password: string }) {
    const user = await findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const payload = { userId: user.id, email: user.email };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken,
    };
  },

  async refresh(refreshToken: string) {
    try {
      const payload = verifyRefreshToken(refreshToken) as any;
      const accessToken = signAccessToken({
        userId: payload.userId,
        email: payload.email,
      });
      return accessToken;
    } catch (err) {
      throw new Error("Invalid refresh token");
    }
  },
};
