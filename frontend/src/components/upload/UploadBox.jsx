import { useState } from "react";
import DragDrop from "./DragDrop";
import FilePreview from "./FilePreview";

/** Dropzone + selected-file preview. Owns only local selection state. */
export default function UploadBox({ file, onSelect, onClear, disabled }) {
  const [localFile, setLocalFile] = useState(null);
  const current = file ?? localFile;

  const handleFile = (nextFile) => {
    setLocalFile(nextFile);
    onSelect?.(nextFile);
  };

  const handleClear = () => {
    setLocalFile(null);
    onClear?.();
  };

  return (
    <div className="space-y-4">
      <DragDrop onFile={handleFile} disabled={disabled} />
      {current ? <FilePreview file={current} onRemove={disabled ? undefined : handleClear} /> : null}
    </div>
  );
}
