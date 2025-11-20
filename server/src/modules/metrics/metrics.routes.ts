import { Router } from "express";
import { MetricController } from "./metrics.controller";

const router = Router();

router.post("/", MetricController.create);
router.get("/:projectId", MetricController.getByProject);
router.post("/receiveMetrics", (req, res) => {
  console.log(req.body);
  res.status(200).json({ msg: "data received" });
});

export default router;
