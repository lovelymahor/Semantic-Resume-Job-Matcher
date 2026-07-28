import { FolderGit2 } from "lucide-react";

export default function ProjectsSection({ projects = [] }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Projects</h4>
      <ul className="space-y-3">
        {projects.length ? (
          projects.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <FolderGit2 className="mt-0.5 size-4 shrink-0 text-success" />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{item.stack}</p>
                {item.summary ? <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p> : null}
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No projects detected.</p>
        )}
      </ul>
    </div>
  );
}
