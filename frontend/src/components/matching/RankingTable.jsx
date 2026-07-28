import Card, { CardHeader } from "../common/Card";
import { formatScore } from "../../utils/formatters";

export default function RankingTable({ matches = [] }) {
  return (
    <Card>
      <CardHeader title="Ranking table" subtitle="Ordered by cosine similarity returned from FAISS." />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              <th className="py-3 pr-4 font-medium">#</th>
              <th className="py-3 pr-4 font-medium">Job</th>
              <th className="py-3 pr-4 font-medium">Company</th>
              <th className="py-3 pr-4 font-medium">Score</th>
              <th className="py-3 font-medium">Gap</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={match.id ?? index} className="border-b border-border/60 last:border-0">
                <td className="py-3 pr-4 font-mono text-muted-foreground">{match.rank ?? index + 1}</td>
                <td className="py-3 pr-4 font-medium">{match.title}</td>
                <td className="py-3 pr-4 text-muted-foreground">{match.company}</td>
                <td className="py-3 pr-4 font-mono text-primary">{formatScore(match.score)}</td>
                <td className="py-3 text-muted-foreground">{(match.missing_skills || []).length} skills</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
