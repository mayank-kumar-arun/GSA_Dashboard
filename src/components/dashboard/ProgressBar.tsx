import React from "react";

interface ProgressBarProps {
  value: number; // 0–100
}

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full  transition-all"
        style={{
          width: `${Math.min(Math.max(value, 0), 100)}%`,
          background: "var(--progess-color)",
        }}
      />
    </div>
  );
}
