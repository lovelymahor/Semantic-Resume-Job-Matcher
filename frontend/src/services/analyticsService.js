import { apiGet, withFallback } from "./api";
import { API_ENDPOINTS, DEMO_ANALYTICS } from "../utils/constants";

/** GET /api/analytics — aggregate charts for score trends and skill gaps. */
export const getAnalytics = () =>
  withFallback(() => apiGet(API_ENDPOINTS.analytics), DEMO_ANALYTICS);
