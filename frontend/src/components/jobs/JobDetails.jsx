import Card, { CardHeader } from "../common/Card";
import Badge from "../common/Badge";
import JobDescription from "./JobDescription";
import MissingSkills from "./MissingSkills";
import CompanyCard from "./CompanyCard";

export default function JobDetails({ job }) {
  if (!job) return null;

  return (
    <Card className="space-y-5">
      <CardHeader title={job.title} subtitle={job.company} />
      <CompanyCard company={job.company} location={job.location} />
      <JobDescription text={job.description} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Matched skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(job.matched_skills || []).map((skill) => (
              <Badge key={skill} tone="success">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <MissingSkills skills={job.missing_skills} />
      </div>
    </Card>
  );
}
