import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search jobs, skills…" }) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-border bg-secondary/40 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
