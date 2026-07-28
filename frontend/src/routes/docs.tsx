import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Docs";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "API docs — Semantic Resume–Job Matcher" },
      { name: "description", content: "Reference for the Flask REST endpoints consumed by this frontend." },
      { property: "og:title", content: "API docs — Semantic Resume–Job Matcher" },
      { property: "og:description", content: "Reference for the Flask REST endpoints consumed by this frontend." },
    ],
  }),
  component: Page,
});
