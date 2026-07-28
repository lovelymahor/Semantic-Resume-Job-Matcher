import { Inbox } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Upload a resume to populate this view.",
  actionLabel,
  onAction,
  icon: Icon = Inbox,
}) {
  return (
    <div className="surface flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="size-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
