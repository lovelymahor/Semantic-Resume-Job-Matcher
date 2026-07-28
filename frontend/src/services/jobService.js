import { apiGet, withFallback } from "./api";
import { API_ENDPOINTS, DEMO_JOBS } from "../utils/constants";

/** GET /api/jobs — the job-description corpus indexed in FAISS. */
export const getJobs = (params) =>
  withFallback(async () => {
    const data = await apiGet(API_ENDPOINTS.jobs, params);
    return Array.isArray(data) ? { jobs: data } : data;
  }, { jobs: DEMO_JOBS });

/** GET /api/jobs/:id */
export const getJobById = (id) =>
  withFallback(() => apiGet(`${API_ENDPOINTS.jobs}/${id}`), {
    job: DEMO_JOBS.find((job) => String(job.id) === String(id)) || DEMO_JOBS[0],
  });
