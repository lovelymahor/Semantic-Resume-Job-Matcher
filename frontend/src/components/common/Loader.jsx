import { Loader2 } from "lucide-react";
import { cn } from "../../utils/helpers";

export default function Loader({ label = "Loading", className, size = "md" }) {
  const sizes = { sm: "size-4", md: "size-6", lg: "size-8" };
  return (
    <div className={cn("flex items-center justify-center gap-3 py-10 text-muted-foreground", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizes[size])} />
      <span className="text-sm">{label}…</span>
    </div>
  );
}
