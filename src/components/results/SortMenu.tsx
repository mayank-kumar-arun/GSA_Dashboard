interface SortMenuProps {
  sort: string;
  setSort: (v: string) => void;
}

export default function SortMenu({ sort, setSort }: SortMenuProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort"
        className="text-sm"
        style={{ color: "var(--text)" }}
      >
        Sort by
      </label>

      <select
        id="sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-lg border px-2 py-1.5 text-sm focus:outline-none focus:ring hover:border-gray-400"
      >
        <option value="due" style={{ color: "black" }}>
          Due date
        </option>
        <option value="complete" style={{ color: "black" }}>
          % complete
        </option>
        <option value="fit" style={{ color: "black" }}>
          Fit score
        </option>
      </select>
    </div>
  );
}
