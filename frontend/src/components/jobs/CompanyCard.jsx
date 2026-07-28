import { Building2, MapPin } from "lucide-react";

export default function CompanyCard({ company, location }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-4">
      <span className="grid size-10 place-items-center rounded-lg bg-accent/15 text-accent">
        <Building2 className="size-5" />
      </span>
      <div>
        <p className="text-sm font-medium">{company || "Unknown company"}</p>
        {location ? (
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5" /> {location}
          </p>
        ) : null}
      </div>
    </div>
  );
}
