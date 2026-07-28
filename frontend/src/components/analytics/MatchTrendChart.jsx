import LineChartCard from "./LineChartCard";

export default function MatchTrendChart({ data = [] }) {
  return (
    <LineChartCard
      title="Top-score trend"
      subtitle="Best cosine similarity across recent pipeline runs."
      data={data}
    />
  );
}
