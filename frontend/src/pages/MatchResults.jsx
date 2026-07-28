import { Link } from "@tanstack/react-router";
import PageContainer from "../components/layout/PageContainer";
import MatchResultsView from "../components/matching/MatchResults";
import EmptyState from "../components/common/EmptyState";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import { useMatch } from "../hooks/useMatch";

export default function MatchResults() {
  const { matches, stats, isDemo } = useMatch();

  return (
    <PageContainer
      sidebar
      eyebrow="Step 02"
      title="Match results"
      description="Ranked job descriptions ordered by cosine similarity against your resume embedding."
      actions={isDemo ? <Badge tone="warning">Demo response</Badge> : null}
    >
      {matches.length ? (
        <MatchResultsView matches={matches} stats={stats} />
      ) : (
        <EmptyState
          title="No results in this session"
          description="Run a resume through the pipeline first — results are held in memory only."
        />
      )}
      <div className="mt-8">
        <Button as={Link} to="/resume" variant="outline">
          View parsed resume
        </Button>
      </div>
    </PageContainer>
  );
}
