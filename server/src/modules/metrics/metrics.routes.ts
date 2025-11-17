import { Router } from "express";
import { MetricController } from "./metrics.controller";

const router = Router();

router.post("/", MetricController.create);
router.get("/:projectId", MetricController.getByProject);

export default router;
