import { apiGet, withFallback } from "./api";
import { API_ENDPOINTS, DEMO_BENCHMARK } from "../utils/constants";

/** GET /api/benchmark — semantic search vs TF-IDF metrics. */
export const getBenchmark = () =>
  withFallback(() => apiGet(API_ENDPOINTS.benchmark), DEMO_BENCHMARK);
