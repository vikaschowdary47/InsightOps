import { Request, Response } from "express";
import { authService } from "./user.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(
      req.body
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ user, accessToken });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: "No refresh token" });
    const accessToken = await authService.refresh(token);
    res.json({ accessToken });
  } catch (err: any) {
    res.status(403).json({ error: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // optionally blacklist the refresh token here
    res.clearCookie("refreshToken");
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
