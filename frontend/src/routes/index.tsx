import { createFileRoute } from "@tanstack/react-router";
import Home from "../pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Semantic Resume–Job Matcher — Embedding-based job matching" },
      { name: "description", content: "Upload a resume and get jobs ranked by semantic similarity using FAISS and sentence transformers." },
      { property: "og:title", content: "Semantic Resume–Job Matcher" },
      { property: "og:description", content: "Rank job matches by meaning, not keywords." },
    ],
  }),
  component: Home,
});
