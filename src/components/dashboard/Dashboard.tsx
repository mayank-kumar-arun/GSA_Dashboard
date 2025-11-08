import React, { useMemo } from "react";
import ProgressBar from "./ProgressBar";
import DonutChart from "./DonutChart";
import type { Application, Status } from "../../data/application";

interface DashboardProps {
  items: Application[];
}

export default function Dashboard({ items }: DashboardProps) {
  const counts = useMemo(() => {
    const map: Record<Status, number> = {
      Draft: 0,
      Ready: 0,
      Submitted: 0,
      Awarded: 0,
      Lost: 0,
    };
    items.forEach((i) => map[i.status]++);
    return map;
  }, [items]);

  const total = items.length || 1;
  const avgComplete = Math.round(
    items.reduce((a, b) => a + b.percentComplete, 0) / total
  );
  const totalCeiling = items
    .reduce((a, b) => a + b.ceiling, 0)
    .toLocaleString();
  const avgFit = Math.round(items.reduce((a, b) => a + b.fitScore, 0) / total);
  const dueSoonest =
    items.slice().sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]
      ?.dueDate || "—";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        className="rounded-2xl p-4 shadow-sm space-y-2"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <h3 className="text-lg font-semibold " style={{ color: "var(--text)" }}>
          Progress
        </h3>
        <ProgressBar value={avgComplete} />
        <div className="text-sm" style={{ color: "var(--text)" }}>
          {avgComplete}% average across {items.length} items
        </div>
      </div>

      <div
        className="rounded-2xl p-4 shadow-sm"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <h3 className="text-lg font-semibold " style={{ color: "var(--text)" }}>
          Status
        </h3>
        <div className="mt-3">
          <DonutChart counts={counts} />
        </div>
      </div>

      <div
        className="rounded-2x p-4 shadow-sm space-y-1 text-sm text-gray-700"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <h3 className="text-lg font-semibold " style={{ color: "var(--text)" }}>
          Insights
        </h3>
        <p style={{ color: "var(--text)" }}>Total ceiling: ${totalCeiling}</p>
        <p style={{ color: "var(--text)" }}>Avg fit score: {avgFit}</p>
        <p style={{ color: "var(--text)" }}>Next due: {dueSoonest}</p>
      </div>
    </div>
  );
}
