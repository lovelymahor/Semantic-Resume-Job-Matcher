import { truncate } from "../../utils/helpers";

export default function JobDescription({ text = "", compact = false }) {
  if (!text) return <p className="text-xs text-muted-foreground">No description provided.</p>;
  return (
    <p className="text-sm leading-relaxed text-muted-foreground">
      {compact ? truncate(text, 140) : text}
    </p>
  );
}
