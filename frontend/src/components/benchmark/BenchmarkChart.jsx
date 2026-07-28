import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card, { CardHeader } from "../common/Card";

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
};

/** Generic grouped bar chart used across the benchmark page. */
export default function BenchmarkChart({ title, subtitle, data = [], xKey, unit = "" }) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey={xKey} stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} unit={unit} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-secondary)", opacity: 0.4 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="semantic" name="Semantic" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="tfidf" name="TF-IDF" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
