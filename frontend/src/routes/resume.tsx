import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/ResumeAnalysis";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume analysis — Semantic Resume–Job Matcher" },
      { name: "description", content: "Structured skills, experience, education and projects parsed from your resume." },
      { property: "og:title", content: "Resume analysis — Semantic Resume–Job Matcher" },
      { property: "og:description", content: "Structured skills, experience, education and projects parsed from your resume." },
    ],
  }),
  component: Page,
});
