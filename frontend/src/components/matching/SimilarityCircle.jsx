import { clamp } from "../../utils/helpers";

export default function SimilarityCircle({ score = 0, size = 96, label = "score" }) {
  const pct = clamp(score);
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} className="stroke-secondary" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          className="stroke-primary transition-[stroke-dashoffset] duration-700"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-mono text-lg font-semibold">{(pct * 100).toFixed(0)}%</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
