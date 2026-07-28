import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "../../utils/constants";
import { cn } from "../../utils/helpers";

/** Low-level dropzone primitive — no business logic. */
export default function DragDrop({ onFile, disabled }) {
  const onDrop = useCallback((files) => files?.[0] && onFile?.(files[0]), [onFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_FILE_TYPES,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/25 px-6 py-14 text-center transition-colors",
        isDragActive && "border-primary bg-primary/10",
        disabled && "pointer-events-none opacity-60",
      )}
    >
      <input {...getInputProps()} />
      <span className="grid size-14 place-items-center rounded-2xl bg-primary/15 text-primary">
        <UploadCloud className="size-6" />
      </span>
      <p className="mt-5 text-sm font-medium">
        {isDragActive ? "Drop the resume here" : "Drag & drop your resume, or click to browse"}
      </p>
      <p className="mt-1.5 text-xs text-muted-foreground">PDF, DOCX or TXT · max 5 MB</p>
    </div>
  );
}
