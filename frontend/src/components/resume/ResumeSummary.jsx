import Card, { CardHeader } from "../common/Card";
import { FileText } from "lucide-react";

export default function ResumeSummary({ resume }) {
  if (!resume) return null;
  return (
    <Card>
      <CardHeader
        title={resume.name || "Parsed resume"}
        subtitle={resume.title || "Extracted by the Flask parser"}
        icon={FileText}
      />
      <p className="text-sm leading-relaxed text-muted-foreground">
        {resume.summary || "No summary was produced for this resume."}
      </p>
    </Card>
  );
}
