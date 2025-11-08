import { useMemo } from "react";
import ResultCard from "./ResultCard";
import SortMenu from "./SortMenu";
import type { Application } from "../../data/application";

interface ResultsListProps {
  items: Application[];
  sort: string;
  setSort: (v: string) => void;
  onOpen: (a: Application) => void;
}

export default function ResultsList({
  items,
  sort,
  setSort,
  onOpen,
}: ResultsListProps) {
  const sorted = useMemo(() => {
    const arr = [...items];
    if (sort === "due") arr.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    else if (sort === "complete")
      arr.sort((a, b) => b.percentComplete - a.percentComplete);
    else if (sort === "fit") arr.sort((a, b) => b.fitScore - a.fitScore);
    return arr;
  }, [items, sort]);

  return (
    <div
      className="rounded-2xl p-4 shadow-sm"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
          Applications
        </h2>
        <SortMenu sort={sort} setSort={setSort} />
      </div>

      {!items.length ? (
        <div className="mt-6 rounded-lg border border-dashed p-8 text-center text-sm text-gray-600">
          No matches. Try adjusting filters.
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {sorted.map((a) => (
            <li key={a.id}>
              <ResultCard app={a} onOpen={onOpen} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
