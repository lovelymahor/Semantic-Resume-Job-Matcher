import { AlertTriangle } from "lucide-react";
import Button from "./Button";

export default function ErrorState({
  title = "Something went wrong",
  message = "The Flask API did not respond as expected.",
  onRetry,
}) {
  return (
    <div className="surface flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md font-mono text-xs text-muted-foreground">{message}</p>
      {onRetry ? (
        <Button variant="outline" className="mt-6" onClick={onRetry}>
          Retry request
        </Button>
      ) : null}
    </div>
  );
}
