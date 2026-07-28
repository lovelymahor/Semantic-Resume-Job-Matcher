import { useCallback, useMemo } from "react";
import { useMatchContext } from "../context/MatchContext";
import { matchText } from "../services/matchService";
import { sortByScore, uniq } from "../utils/helpers";

/** Read/derive helpers for the current match result. */
export function useMatch() {
  const { result, status, error, saveResult, reset } = useMatchContext();

  const matches = useMemo(() => sortByScore(result?.matches || []), [result]);
  const resume = result?.resume || null;

  const stats = useMemo(() => {
    if (!matches.length) return { total: 0, top: 0, average: 0, missing: 0 };
    const scores = matches.map((m) => m.score || 0);
    return {
      total: matches.length,
      top: Math.max(...scores),
      average: scores.reduce((a, b) => a + b, 0) / scores.length,
      missing: uniq(matches.flatMap((m) => m.missing_skills || [])).length,
    };
  }, [matches]);

  const rematchText = useCallback(
    async (text, topK = 5) => {
      const data = await matchText(text, topK);
      saveResult(data, null);
      return data;
    },
    [saveResult],
  );

  return { result, resume, matches, stats, status, error, rematchText, reset, isDemo: Boolean(result?.demo) };
}
