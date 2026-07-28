import { cn } from "../../utils/helpers";

const tones = {
  default: "bg-secondary text-secondary-foreground border-border",
  primary: "bg-primary/15 text-primary border-primary/30",
  accent: "bg-accent/15 text-accent border-accent/30",
  success: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  danger: "bg-destructive/15 text-destructive border-destructive/30",
  muted: "bg-muted text-muted-foreground border-border",
};

export default function Badge({ tone = "default", className, children, icon: Icon }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone] || tones.default,
        className,
      )}
    >
      {Icon ? <Icon className="size-3" /> : null}
      {children}
    </span>
  );
}
