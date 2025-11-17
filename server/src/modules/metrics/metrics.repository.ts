// src/modules/metric/metric.repository.ts
import { MetricDTO } from "./metrics.model";

let metricsStore: MetricDTO[] = [];

export const MetricRepository = {
  async create(metric: MetricDTO) {
    metricsStore.push(metric);
    return metric;
  },

  async findByProject(projectId: number) {
    return metricsStore.filter((m) => m.projectId === projectId);
  },
};
