import Card from "../common/Card";
import { cn } from "../../utils/helpers";

export default function DashboardStats({ stats = [] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, hint, icon: Icon, tone = "primary" }) => (
        <Card key={label} hover className="p-5">
          <div className="flex items-start justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
            {Icon ? (
              <span className={cn("grid size-8 place-items-center rounded-lg", tone === "accent" ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary")}>
                <Icon className="size-4" />
              </span>
            ) : null}
          </div>
          <p className="mt-3 font-mono text-2xl font-semibold">{value}</p>
          {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
        </Card>
      ))}
    </div>
  );
}
