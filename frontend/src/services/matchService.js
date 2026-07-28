import { apiPost, withFallback } from "./api";
import { API_ENDPOINTS, DEMO_MATCH } from "../utils/constants";
import { toFormData } from "../utils/fileUtils";

/** POST /api/match — embeddings + FAISS search, returns top-k jobs. */
export const matchResume = (file, topK = 5) =>
  withFallback(() => apiPost(API_ENDPOINTS.match, toFormData(file, { top_k: topK })), DEMO_MATCH);

/** POST /api/match with raw text (no file). */
export const matchText = (text, topK = 5) =>
  withFallback(() => apiPost(API_ENDPOINTS.match, { text, top_k: topK }), DEMO_MATCH);
