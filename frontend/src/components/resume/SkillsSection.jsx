import Badge from "../common/Badge";

export default function SkillsSection({ skills = [] }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Skills</h4>
      <div className="flex flex-wrap gap-1.5">
        {skills.length ? (
          skills.map((skill) => (
            <Badge key={skill} tone="primary">
              {skill}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No skills extracted.</p>
        )}
      </div>
    </div>
  );
}
