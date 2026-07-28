import { Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../utils/helpers";

/** Visualises the Flask pipeline stages while the request is in-flight. */
export default function UploadProgress({ stages, stageIndex, progress }) {
  return (
    <div className="space-y-5">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <ol className="space-y-2.5">
        {stages.map((stage, index) => {
          const done = index < stageIndex;
          const active = index === stageIndex;
          return (
            <li
              key={stage.key}
              className={cn(
                "flex items-start gap-3 rounded-xl border px-4 py-3 transition-colors",
                active ? "border-primary/40 bg-primary/10" : "border-border bg-secondary/20",
                !active && !done && "opacity-50",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs",
                  done ? "bg-success/20 text-success" : active ? "bg-primary/25 text-primary" : "bg-secondary text-muted-foreground",
                )}
              >
                {done ? <Check className="size-3.5" /> : active ? <Loader2 className="size-3.5 animate-spin" /> : index + 1}
              </span>
              <div>
                <p className="text-sm font-medium">{stage.label}</p>
                <p className="font-mono text-xs text-muted-foreground">{stage.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
