import BenchmarkChart from "./BenchmarkChart";

export default function PrecisionChart({ data = [] }) {
  return (
    <BenchmarkChart
      title="Retrieval quality"
      subtitle="Precision, recall, MRR and nDCG across both retrievers."
      data={data}
      xKey="metric"
    />
  );
}
