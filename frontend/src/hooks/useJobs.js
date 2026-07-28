import { useCallback, useEffect, useState } from "react";
import { getJobs } from "../services/jobService";

/** GET /api/jobs — the indexed job-description corpus. */
export function useJobs(params) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getJobs(params);
      setJobs(data.jobs || []);
      setIsDemo(Boolean(data.demo));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params || {})]);

  useEffect(() => {
    load();
  }, [load]);

  return { jobs, loading, error, isDemo, reload: load };
}
