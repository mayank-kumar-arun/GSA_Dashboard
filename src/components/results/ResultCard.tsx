import { relativeDate } from "../../utils/date";
import ProgressBar from "../dashboard/ProgressBar";
import type { Application } from "../../data/application";
import { Chip } from "../ui/Chips";

interface ResultCardProps {
  app: Application;
  onOpen: (a: Application) => void;
}

export default function ResultCard({ app, onOpen }: ResultCardProps) {
  return (
    <button
      className="w-full text-left rounded-xl border p-4 hover:shadow transition focus:outline-none focus:ring"
      onClick={() => onOpen(app)}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">
            {app.agency} · {app.naics} · {app.vehicle}
          </div>

          <div className="mt-1 text-base font-semibold" style={{ color: "var(--text)" }}>
            {app.title}
          </div>

          <div className="mt-1 flex flex-wrap gap-2">
            {app.setAside.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>

        <div className="text-right text-sm text-gray-600">
          <div>
            <strong>{app.fitScore}</strong> Fit
          </div>
          <div className="mt-1">Due {relativeDate(app.dueDate)}</div>
          <div className="mt-1 text-xs">
            {new Date(app.dueDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar value={app.percentComplete} />
        </div>
        <span className="text-sm text-gray-700">{app.percentComplete}%</span>
      </div>

      <div className="mt-2 text-xs text-gray-500">Status: {app.status}</div>
    </button>
  );
}
