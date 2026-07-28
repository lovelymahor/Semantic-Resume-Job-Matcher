import LineChartCard from "../analytics/LineChartCard";
import PieChartCard from "../analytics/PieChartCard";
import Loader from "../common/Loader";
import { useAnalytics } from "../../hooks/useAnalytics";

export default function AnalyticsOverview() {
  const { data, loading } = useAnalytics();

  if (loading) return <Loader label="Loading analytics" />;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <LineChartCard title="Match trend" subtitle="Top score per run." data={data?.match_trend || []} />
      <PieChartCard title="Score distribution" subtitle="Similarity buckets across the corpus." data={data?.score_distribution || []} />
    </div>
  );
}
