import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Benchmark";

export const Route = createFileRoute("/benchmark")({
  head: () => ({
    meta: [
      { title: "Benchmark — Semantic Resume–Job Matcher" },
      { name: "description", content: "Semantic search compared against TF-IDF on precision, recall, latency and ranking." },
      { property: "og:title", content: "Benchmark — Semantic Resume–Job Matcher" },
      { property: "og:description", content: "Semantic search compared against TF-IDF on precision, recall, latency and ranking." },
    ],
  }),
  component: Page,
});
