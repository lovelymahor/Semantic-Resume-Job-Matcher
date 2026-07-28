import { Briefcase } from "lucide-react";

export default function ExperienceSection({ experience = [] }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Experience</h4>
      <ul className="space-y-4">
        {experience.length ? (
          experience.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <Briefcase className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">
                  {item.role} · <span className="text-muted-foreground">{item.company}</span>
                </p>
                <p className="font-mono text-xs text-muted-foreground">{item.period}</p>
                {item.summary ? <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p> : null}
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No experience detected.</p>
        )}
      </ul>
    </div>
  );
}
