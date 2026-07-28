import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/MatchResults";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Match results — Semantic Resume–Job Matcher" },
      { name: "description", content: "Job descriptions ranked by cosine similarity against your resume embedding." },
      { property: "og:title", content: "Match results — Semantic Resume–Job Matcher" },
      { property: "og:description", content: "Job descriptions ranked by cosine similarity against your resume embedding." },
    ],
  }),
  component: Page,
});
