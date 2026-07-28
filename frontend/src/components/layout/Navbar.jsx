import { Link } from "@tanstack/react-router";
import { BrainCircuit, Github, Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "../common/Button";

const links = [
  { to: "/", label: "Home" },
  { to: "/upload", label: "Upload" },
  { to: "/results", label: "Results" },
  { to: "/benchmark", label: "Benchmark" },
  { to: "/analytics", label: "Analytics" },
  { to: "/about", label: "About" },
  { to: "/docs", label: "Docs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <BrainCircuit className="size-4.5 text-primary-foreground" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Semantic<span className="text-muted-foreground">/</span>Matcher
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-foreground bg-secondary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-lg px-3 py-2 text-sm transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button as="a" href="https://github.com" target="_blank" rel="noreferrer" variant="outline" size="sm" className="hidden sm:inline-flex">
            <Github className="size-4" />
            Source
          </Button>
          <Button as={Link} to="/upload" size="sm" className="hidden sm:inline-flex">
            Try it
          </Button>
          <button
            className="rounded-lg p-2 text-muted-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border px-5 py-3 lg:hidden">
          <div className="grid gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
