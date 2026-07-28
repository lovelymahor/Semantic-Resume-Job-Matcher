import { GraduationCap } from "lucide-react";

export default function EducationSection({ education = [] }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Education</h4>
      <ul className="space-y-3">
        {education.length ? (
          education.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 size-4 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-medium">{item.degree}</p>
                <p className="text-xs text-muted-foreground">
                  {item.school}
                  {item.year ? ` · ${item.year}` : ""}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No education detected.</p>
        )}
      </ul>
    </div>
  );
}
