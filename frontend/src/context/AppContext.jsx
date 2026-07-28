import { createContext, useContext, useMemo, useState } from "react";
import { API_BASE_URL } from "../utils/constants";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [apiBaseUrl] = useState(API_BASE_URL);
  const [apiOnline, setApiOnline] = useState(null);
  const [topK, setTopK] = useState(5);

  const value = useMemo(
    () => ({ apiBaseUrl, apiOnline, setApiOnline, topK, setTopK }),
    [apiBaseUrl, apiOnline, topK],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
};
