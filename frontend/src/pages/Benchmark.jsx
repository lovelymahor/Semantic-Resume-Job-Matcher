import PageContainer from "../components/layout/PageContainer";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import Badge from "../components/common/Badge";
import PrecisionChart from "../components/benchmark/PrecisionChart";
import SpeedChart from "../components/benchmark/SpeedChart";
import AccuracyChart from "../components/benchmark/AccuracyChart";
import ComparisonTable from "../components/benchmark/ComparisonTable";
import { useBenchmark } from "../hooks/useBenchmark";

export default function Benchmark() {
  const { data, loading, error, isDemo, reload } = useBenchmark();

  return (
    <PageContainer
      sidebar
      eyebrow="Evaluation"
      title="Semantic vs TF-IDF"
      description="Retrieval quality, latency and ranking stability measured on the same job corpus."
      actions={isDemo ? <Badge tone="warning">Demo data</Badge> : null}
    >
      {loading ? (
        <Loader label="Loading benchmark" />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <PrecisionChart data={data?.metrics || []} />
            <AccuracyChart data={data?.accuracy || []} />
          </div>
          <SpeedChart data={data?.speed || []} />
          <ComparisonTable rows={data?.ranking_difference || []} />
        </div>
      )}
    </PageContainer>
  );
}
