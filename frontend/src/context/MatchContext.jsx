import { createContext, useCallback, useContext, useMemo, useState } from "react";

const MatchContext = createContext(null);

/** Holds the current resume + match result across the upload → results flow. */
export function MatchProvider({ children }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | processing | success | error
  const [error, setError] = useState(null);

  const saveResult = useCallback((data, uploadedFile) => {
    setResult(data);
    setStatus("success");
    setError(null);
    setHistory((prev) =>
      [
        {
          id: Date.now(),
          name: uploadedFile?.name || "resume.pdf",
          size: uploadedFile?.size || 0,
          topScore: data?.matches?.[0]?.score ?? 0,
          matches: data?.matches?.length ?? 0,
          uploadedAt: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 6),
    );
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setResult(null);
    setStatus("idle");
    setError(null);
  }, []);

  const value = useMemo(
    () => ({ file, setFile, result, setResult, saveResult, history, status, setStatus, error, setError, reset }),
    [file, result, saveResult, history, status, error, reset],
  );

  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
}

export const useMatchContext = () => {
  const ctx = useContext(MatchContext);
  if (!ctx) throw new Error("useMatchContext must be used inside <MatchProvider>");
  return ctx;
};
