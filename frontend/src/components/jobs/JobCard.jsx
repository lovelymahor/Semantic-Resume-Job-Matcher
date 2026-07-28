import Card from "../common/Card";
import ScoreBadge from "../matching/ScoreBadge";
import JobDescription from "./JobDescription";

export default function JobCard({ job, onSelect }) {
  return (
    <Card hover className="cursor-pointer space-y-3" onClick={() => onSelect?.(job)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">{job.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {job.company}
            {job.location ? ` · ${job.location}` : ""}
          </p>
        </div>
        {typeof job.score === "number" ? <ScoreBadge score={job.score} /> : null}
      </div>
      <JobDescription text={job.description} compact />
    </Card>
  );
}
