import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Upload";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload resume — Semantic Resume–Job Matcher" },
      { name: "description", content: "Send a PDF, DOCX or TXT resume through the semantic matching pipeline." },
      { property: "og:title", content: "Upload resume — Semantic Resume–Job Matcher" },
      { property: "og:description", content: "Send a PDF, DOCX or TXT resume through the semantic matching pipeline." },
    ],
  }),
  component: Page,
});
