import express from "express";
import { MetricController } from "./metric.controller.js";

const router = express.Router();

router.post("/", MetricController.create);
router.get("/:projectId", MetricController.getByProject);
router.get("/generateApiKey/:projectIdx", MetricController.getByProject);

export default router;
