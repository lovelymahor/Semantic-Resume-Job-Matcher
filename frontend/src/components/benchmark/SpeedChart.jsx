import BenchmarkChart from "./BenchmarkChart";

export default function SpeedChart({ data = [] }) {
  return (
    <BenchmarkChart
      title="Latency per stage"
      subtitle="Milliseconds spent in each retrieval stage."
      data={data}
      xKey="stage"
      unit="ms"
    />
  );
}
