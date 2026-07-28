import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card, { CardHeader } from "../common/Card";

export default function SkillGapChart({ data = [] }) {
  return (
    <Card>
      <CardHeader title="Skill gaps" subtitle="Skills most frequently missing from the resume." />
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
            <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis dataKey="skill" type="category" width={90} stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "var(--color-secondary)", opacity: 0.4 }} />
            <Bar dataKey="frequency" name="Job postings" fill="var(--color-chart-4)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
