import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Card, { CardHeader } from "../common/Card";

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

export default function PieChartCard({ title, subtitle, data = [] }) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} stroke="var(--color-card)" />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
