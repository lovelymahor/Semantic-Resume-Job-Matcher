import { Legend, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import Card, { CardHeader } from "../common/Card";

export default function RadarChartCard({ title, subtitle, data = [] }) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
            <Radar name="Resume" dataKey="resume" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.35} />
            <Radar name="Market" dataKey="market" stroke="var(--color-chart-2)" fill="var(--color-chart-2)" fillOpacity={0.2} />
            <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
