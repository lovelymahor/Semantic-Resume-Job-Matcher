import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Analytics";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Semantic Resume–Job Matcher" },
      { name: "description", content: "Score distribution, match trends and skill-gap charts for your resume." },
      { property: "og:title", content: "Analytics — Semantic Resume–Job Matcher" },
      { property: "og:description", content: "Score distribution, match trends and skill-gap charts for your resume." },
    ],
  }),
  component: Page,
});
