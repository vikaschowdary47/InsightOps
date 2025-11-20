import { Request, Response } from "express";
import { userService } from "./user.service";

export const UserController = {
  async createUser(req: Request, res: Response) {
    try {
      // const metric = await MetricService.addMetric(req.body);
      // res.json(metric);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  async loginUser(req: Request, res: Response) {
    try {
      const login = userService.userLogin(req.body);
      return res.json(login);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
