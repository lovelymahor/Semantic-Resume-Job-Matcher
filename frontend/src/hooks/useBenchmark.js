import { useCallback, useEffect, useState } from "react";
import { getBenchmark } from "../services/benchmarkService";

/** GET /api/benchmark — semantic vs TF-IDF comparison. */
export function useBenchmark() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await getBenchmark());
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
