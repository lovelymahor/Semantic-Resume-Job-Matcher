import { Link } from "@tanstack/react-router";
import { BarChart3, BookOpen, FileUp, GaugeCircle, Home, Info, LayoutDashboard, ListOrdered } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload Resume", icon: FileUp },
  { to: "/results", label: "Match Results", icon: ListOrdered },
  { to: "/benchmark", label: "Benchmark", icon: GaugeCircle },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/about", label: "About", icon: Info },
  { to: "/docs", label: "Documentation", icon: BookOpen },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 xl:block">
      <div className="sticky top-24 space-y-1">
        <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Navigation
        </p>
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            activeProps={{ className: "bg-secondary text-foreground border-primary/40" }}
            inactiveProps={{ className: "text-muted-foreground border-transparent" }}
            className="flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
