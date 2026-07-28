import Card from "../common/Card";
import SimilarityCircle from "./SimilarityCircle";
import { formatPercent } from "../../utils/formatters";

export default function MatchSummary({ stats }) {
  const cells = [
    { label: "Jobs returned", value: stats.total },
    { label: "Average score", value: formatPercent(stats.average, 1) },
    { label: "Skill gaps found", value: stats.missing },
  ];

  return (
    <Card className="flex flex-wrap items-center gap-8">
      <SimilarityCircle score={stats.top} label="top match" />
      <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3">
        {cells.map((cell) => (
          <div key={cell.label}>
            <p className="font-mono text-2xl font-semibold">{cell.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{cell.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
