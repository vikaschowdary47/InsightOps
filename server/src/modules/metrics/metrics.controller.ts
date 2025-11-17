import { Request, Response } from "express";
import { MetricService } from "./metrics.service";

export const MetricController = {
  async create(req: Request, res: Response) {
    try {
      const metric = await MetricService.addMetric(req.body);
      res.json(metric);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  async getByProject(req: Request, res: Response) {
    try {
      const projectId = parseInt(req.params.projectId);
      const metrics = await MetricService.getMetrics(projectId);
      res.json(metrics);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
