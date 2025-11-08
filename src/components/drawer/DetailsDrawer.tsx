import React from "react";
import { relativeDate } from "../../utils/date";
import type { Application, Status } from "../../data/application";
import { Chip } from "../ui/Chips";

interface DetailsDrawerProps {
  app: Application | null;
  onClose: () => void;
  onMarkSubmitted: (id: string) => void;
}

export default function DetailsDrawer({
  app,
  onClose,
  onMarkSubmitted,
}: DetailsDrawerProps) {
  if (!app) return null;

  const stages: Status[] = [
    "Draft",
    "Ready",
    "Submitted",
    app.status === "Awarded"
      ? "Awarded"
      : app.status === "Lost"
      ? "Lost"
      : "Submitted",
  ];
  const activeIdx = stages.indexOf(app.status as Status);

  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/30"
        style={{ zIndex: 1 }}
        onClick={onClose}
      />

      <div
        className="ml-auto h-full w-full max-w-xl overflow-auto rounded-l-2xl p-6 shadow-xl"
        style={{
          zIndex: 2,
          background: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3
              className="text-lg font-semibold "
              style={{ color: "var(--text)" }}
            >
              {app.title}
            </h3>
            <p className="text-sm text-gray-600">
              {app.agency} · {app.naics} · {app.vehicle}
            </p>
          </div>

          <button
            className="rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus:ring"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm text-gray-700">
          <div>
            <strong>Due:</strong> {new Date(app.dueDate).toLocaleDateString()}
            <span className="text-gray-500">
              {" "}
              ({relativeDate(app.dueDate)})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <strong>Set-Aside:</strong>
            {app.setAside.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>

          <div>
            <strong>Fit Score:</strong> {app.fitScore}
          </div>

          <div>
            <strong>Stage</strong>
            <ol className="mt-3 flex items-center gap-2">
              {(["Draft", "Ready", "Submitted", "Awarded/Lost"] as const).map(
                (label, i) => (
                  <li key={label} className="flex items-center gap-2">
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full border
                      ${
                        i <= activeIdx
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-600"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {i < 3 && <span className="h-0.5 w-8 bg-gray-300" />}
                  </li>
                )
              )}
            </ol>
          </div>

          {app.status !== "Submitted" && (
            <button
              className="mt-3 rounded-xl px-4 py-2 text-sm font-medium hover:bg-black focus:outline-none focus:ring"
              onClick={() => onMarkSubmitted(app.id)}
              style={{
                background: "var(--button-background-color) ",
                color: "var(--button-text-color)",
              }}
            >
              Mark as Submitted
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
