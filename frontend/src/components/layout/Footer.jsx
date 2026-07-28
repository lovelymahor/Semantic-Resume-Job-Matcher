import { Link } from "@tanstack/react-router";
import { BrainCircuit } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <BrainCircuit className="size-4 text-primary-foreground" />
          </span>
          <p className="text-sm text-muted-foreground">
            Semantic Resume–Job Matcher · Flask + FAISS + Sentence Transformers
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
          <Link to="/docs" className="hover:text-foreground">Documentation</Link>
          <Link to="/about" className="hover:text-foreground">Architecture</Link>
          <Link to="/benchmark" className="hover:text-foreground">Benchmark</Link>
        </div>
      </div>
    </footer>
  );
}
