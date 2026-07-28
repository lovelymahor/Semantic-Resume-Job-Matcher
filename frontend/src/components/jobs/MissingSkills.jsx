import Badge from "../common/Badge";
import { AlertCircle } from "lucide-react";

export default function MissingSkills({ skills = [] }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Missing skills
      </p>
      {skills.length ? (
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <Badge key={skill} tone="warning" icon={AlertCircle}>
              {skill}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">No gaps detected.</p>
      )}
    </div>
  );
}
