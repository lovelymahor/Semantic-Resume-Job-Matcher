import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { matchResume } from "../services/matchService";
import { useMatchContext } from "../context/MatchContext";
import { PIPELINE_STAGES } from "../utils/constants";
import { validateResumeFile } from "../utils/validators";
import { sleep } from "../utils/helpers";

/** Drives the upload → pipeline-visualisation → result flow. */
export function useUpload() {
  const { setFile, saveResult, setStatus, setError } = useMatchContext();
  const [stageIndex, setStageIndex] = useState(-1);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const start = useCallback(
    async (file, topK = 5) => {
      const { valid, error } = validateResumeFile(file);
      if (!valid) {
        toast.error(error);
        return null;
      }

      setFile(file);
      setStatus("processing");
      setIsUploading(true);
      setError(null);
      setStageIndex(0);
      setProgress(0);

      const request = matchResume(file, topK);

      for (let i = 0; i < PIPELINE_STAGES.length - 1; i += 1) {
        setStageIndex(i);
        setProgress(Math.round(((i + 1) / PIPELINE_STAGES.length) * 100));
        await sleep(650);
      }

      try {
        const data = await request;
        setStageIndex(PIPELINE_STAGES.length - 1);
        setProgress(100);
        saveResult(data, file);
        if (data?.demo) toast("Backend offline — showing demo response", { icon: "🧪" });
        else toast.success("Match complete");
        return data;
      } catch (err) {
        setStatus("error");
        setError(err.message);
        toast.error(err.message);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [saveResult, setError, setFile, setStatus],
  );

  return { start, stageIndex, isUploading, progress, stages: PIPELINE_STAGES };
}
