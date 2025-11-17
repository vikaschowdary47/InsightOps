import { MetricDTO } from "./metrics.model.js";
import { MetricRepository } from "./metrics.repository";

export const MetricService = {
  async addMetric(data: MetricDTO) {
    return await MetricRepository.create(data);
  },

  async getMetrics(projectId: number) {
    return await MetricRepository.findByProject(projectId);
  },
};
