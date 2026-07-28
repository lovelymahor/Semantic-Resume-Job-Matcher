import Card, { CardHeader } from "../common/Card";
import EmptyState from "../common/EmptyState";
import { formatBytes, formatDate, formatPercent } from "../../utils/formatters";

export default function RecentUploads({ history = [] }) {
  if (!history.length) {
    return <EmptyState title="No uploads in this session" description="Resume runs appear here after you use the pipeline." />;
  }

  return (
    <Card>
      <CardHeader title="Recent uploads" subtitle="Session history (client-side only)." />
      <ul className="divide-y divide-border">
        {history.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {formatBytes(item.size)} · {formatDate(item.uploadedAt)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm text-primary">{formatPercent(item.topScore)}</p>
              <p className="text-xs text-muted-foreground">{item.matches} matches</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
