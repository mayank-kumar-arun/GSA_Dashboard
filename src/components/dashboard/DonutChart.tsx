import React from "react";
import type { Status } from "../../data/application";

interface DonutChartProps {
  counts: Record<Status, number>;
}

export default function DonutChart({ counts }: DonutChartProps) {
  const data = [
    { label: "Draft", color: "text-gray-400", value: counts.Draft },
    { label: "Ready", color: "text-blue-500", value: counts.Ready },
    { label: "Submitted", color: "text-amber-500", value: counts.Submitted },
    { label: "Awarded", color: "text-emerald-600", value: counts.Awarded },
    { label: "Lost", color: "text-rose-500", value: counts.Lost },
  ];

  const total = data.reduce((a, b) => a + b.value, 0) || 1;
  const circumference = 2 * Math.PI * 36;

  let offset = 0;
  const segments = data.map((s) => {
    const len = (s.value / total) * circumference;
    const segment = { ...s, dash: `${len} ${circumference - len}`, offset };
    offset += len;
    return segment;
  });

  return (
    <div className="flex items-center gap-6">
      <svg width="110" height="110" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="36"
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />
        {segments.map((s) => (
          <circle
            key={s.label}
            cx="50"
            cy="50"
            r="36"
            strokeWidth="12"
            fill="none"
            className={s.color}
            stroke="currentColor"
            style={{ strokeDasharray: s.dash, strokeDashoffset: -s.offset }}
          />
        ))}
      </svg>

      <ul className="text-sm space-y-1" style={{ color: "var(--text)" }}>
        {data.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-full ${s.color}`} />
            {s.label}: <strong>{s.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
