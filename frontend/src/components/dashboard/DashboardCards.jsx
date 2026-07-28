import { Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, FileUp, GaugeCircle } from "lucide-react";
import Card from "../common/Card";

const cards = [
  { to: "/upload", title: "Upload a resume", description: "Run the FAISS pipeline end to end.", icon: FileUp },
  { to: "/benchmark", title: "Benchmark", description: "Semantic search vs TF-IDF metrics.", icon: GaugeCircle },
  { to: "/analytics", title: "Analytics", description: "Score trends and skill-gap charts.", icon: BarChart3 },
];

export default function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map(({ to, title, description, icon: Icon }) => (
        <Link key={to} to={to}>
          <Card hover className="h-full">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-sm font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary">
              Open <ArrowRight className="size-3.5" />
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
