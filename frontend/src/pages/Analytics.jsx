import PageContainer from "../components/layout/PageContainer";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import Badge from "../components/common/Badge";
import PieChartCard from "../components/analytics/PieChartCard";
import MatchTrendChart from "../components/analytics/MatchTrendChart";
import RadarChartCard from "../components/analytics/RadarChartCard";
import SkillGapChart from "../components/analytics/SkillGapChart";
import { useAnalytics } from "../hooks/useAnalytics";

export default function Analytics() {
  const { data, loading, error, isDemo, reload } = useAnalytics();

  return (
    <PageContainer
      sidebar
      eyebrow="Insights"
      title="Analytics"
      description="Score distribution, trends over runs and the skills the market wants that your resume lacks."
      actions={isDemo ? <Badge tone="warning">Demo data</Badge> : null}
    >
      {loading ? (
        <Loader label="Loading analytics" />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <MatchTrendChart data={data?.match_trend || []} />
          <PieChartCard title="Score distribution" subtitle="How similarity scores spread across the corpus." data={data?.score_distribution || []} />
          <RadarChartCard title="Skill coverage" subtitle="Resume strength vs market demand." data={data?.skill_radar || []} />
          <SkillGapChart data={data?.skill_gap || []} />
        </div>
      )}
    </PageContainer>
  );
}
