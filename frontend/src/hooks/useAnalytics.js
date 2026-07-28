import { useCallback, useEffect, useState } from "react";
import { getAnalytics } from "../services/analyticsService";

/** GET /api/analytics — chart data for score trends and skill gaps. */
export function useAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await getAnalytics());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, isDemo: Boolean(data?.demo), reload: load };
}
