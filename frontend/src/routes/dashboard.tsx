import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Semantic Resume–Job Matcher" },
      { name: "description", content: "Session overview of resume runs, top similarity scores and live analytics." },
      { property: "og:title", content: "Dashboard — Semantic Resume–Job Matcher" },
      { property: "og:description", content: "Session overview of resume runs, top similarity scores and live analytics." },
    ],
  }),
  component: Page,
});
