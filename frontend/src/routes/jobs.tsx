import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Jobs";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Indexed jobs — Semantic Resume–Job Matcher" },
      { name: "description", content: "Browse every job description currently stored in the FAISS vector index." },
      { property: "og:title", content: "Indexed jobs — Semantic Resume–Job Matcher" },
      { property: "og:description", content: "Browse every job description currently stored in the FAISS vector index." },
    ],
  }),
  component: Page,
});
