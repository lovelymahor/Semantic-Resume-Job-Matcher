import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import Card, { CardHeader } from "../common/Card";
import Button from "../common/Button";
import UploadBox from "./UploadBox";
import UploadProgress from "./UploadProgress";
import { useUpload } from "../../hooks/useUpload";
import { isPositiveInt } from "../../utils/validators";

/** Upload form + pipeline visualisation, wired to POST /api/match. */
export default function UploadArea() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const { start, stageIndex, isUploading, progress, stages } = useUpload();
  const { register, handleSubmit, formState } = useForm({ defaultValues: { topK: 5 } });

  const onSubmit = async ({ topK }) => {
    const result = await start(file, Number(topK));
    if (result) navigate({ to: "/results" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card>
        <CardHeader
          title="Upload a resume"
          subtitle="The file is sent to the Flask API as multipart/form-data."
          icon={Sparkles}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <UploadBox file={file} onSelect={setFile} onClear={() => setFile(null)} disabled={isUploading} />

          <div className="grid gap-2">
            <label htmlFor="topK" className="text-sm font-medium">
              Top-K matches
            </label>
            <input
              id="topK"
              type="number"
              min={1}
              max={20}
              disabled={isUploading}
              className="h-11 w-full rounded-xl border border-border bg-secondary/40 px-4 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/40"
              {...register("topK", { validate: (v) => isPositiveInt(v) || "Enter a positive number" })}
            />
            {formState.errors.topK ? (
              <p className="text-xs text-destructive">{formState.errors.topK.message}</p>
            ) : null}
          </div>

          <Button type="submit" size="lg" disabled={!file || isUploading} className="w-full">
            {isUploading ? "Running pipeline…" : "Run semantic match"}
          </Button>
        </form>
      </Card>

      <Card>
        <CardHeader title="Backend pipeline" subtitle="Live view of the Flask request lifecycle." />
        <UploadProgress stages={stages} stageIndex={stageIndex} progress={progress} />
      </Card>
    </div>
  );
}
