import { FileText, X } from "lucide-react";
import { formatBytes } from "../../utils/formatters";
import { getFileExtension } from "../../utils/fileUtils";

export default function FilePreview({ file, onRemove }) {
  if (!file) return null;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4">
      <span className="grid size-11 place-items-center rounded-lg bg-primary/15 text-primary">
        <FileText className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{file.name}</p>
        <p className="mt-0.5 font-mono text-xs text-muted-foreground">
          {getFileExtension(file.name)} · {formatBytes(file.size)}
        </p>
      </div>
      {onRemove ? (
        <button
          onClick={onRemove}
          aria-label="Remove file"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
