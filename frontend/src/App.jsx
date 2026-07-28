import { Toaster } from "react-hot-toast";
import { Outlet } from "@tanstack/react-router";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";
import { MatchProvider } from "./context/MatchContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

/**
 * Application shell: providers + persistent chrome around the routed page.
 * Rendered from src/routes/__root.tsx.
 */
export default function App({ children }) {
  return (
    <ThemeProvider>
      <AppProvider>
        <MatchProvider>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <div className="flex-1">{children ?? <Outlet />}</div>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--color-card)",
                color: "var(--color-foreground)",
                border: "1px solid var(--color-border)",
                fontSize: "14px",
              },
            }}
          />
        </MatchProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
