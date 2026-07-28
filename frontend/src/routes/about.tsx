import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Semantic Resume–Job Matcher" },
      { name: "description", content: "How the semantic resume matcher works: Flask, FAISS and sentence transformers." },
      { property: "og:title", content: "About — Semantic Resume–Job Matcher" },
      { property: "og:description", content: "How the semantic resume matcher works: Flask, FAISS and sentence transformers." },
    ],
  }),
  component: Page,
});
