import Card, { CardHeader } from "../common/Card";
import Badge from "../common/Badge";

export default function ComparisonTable({ rows = [] }) {
  return (
    <Card>
      <CardHeader title="Ranking difference" subtitle="Same corpus, different retriever — position per job." />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              <th className="py-3 pr-4 font-medium">Job</th>
              <th className="py-3 pr-4 font-medium">Semantic rank</th>
              <th className="py-3 pr-4 font-medium">TF-IDF rank</th>
              <th className="py-3 font-medium">Delta</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const delta = (row.tfidf_rank ?? 0) - (row.semantic_rank ?? 0);
              return (
                <tr key={row.job} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-4 font-medium">{row.job}</td>
                  <td className="py-3 pr-4 font-mono text-primary">#{row.semantic_rank}</td>
                  <td className="py-3 pr-4 font-mono text-muted-foreground">#{row.tfidf_rank}</td>
                  <td className="py-3">
                    <Badge tone={delta > 0 ? "success" : delta < 0 ? "warning" : "muted"}>
                      {delta > 0 ? `+${delta}` : delta}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
