import MatchCard from "./MatchCard";
import EmptyState from "../common/EmptyState";

export default function TopMatches({ matches = [], limit }) {
  const list = limit ? matches.slice(0, limit) : matches;
  if (!list.length) {
    return <EmptyState title="No matches yet" description="Run a resume through the pipeline to see ranked jobs." />;
  }
  return (
    <div className="grid gap-4">
      {list.map((match, index) => (
        <MatchCard key={match.id ?? index} match={match} index={index} />
      ))}
    </div>
  );
}
