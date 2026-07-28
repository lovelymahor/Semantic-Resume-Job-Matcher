import { cn } from "../../utils/helpers";

export default function Card({ className, children, hover = false, ...props }) {
  return (
    <div
      className={cn("surface p-6", hover && "transition-all hover:border-primary/40 hover:-translate-y-0.5", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, icon: Icon, action }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {Icon ? (
          <span className="mt-0.5 grid size-9 place-items-center rounded-lg bg-primary/15 text-primary">
            <Icon className="size-4.5" />
          </span>
        ) : null}
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {action}
    </div>
  );
}
