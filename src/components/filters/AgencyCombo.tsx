import React, { useState, useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Chip } from "../ui/Chips";

interface AgencyComboProps {
  options: string[];
  values: string[];
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
}

export default function AgencyCombo({
  options,
  values,
  onAdd,
  onRemove,
}: AgencyComboProps) {
  const [q, setQ] = useState("");
  const debounced = useDebounce(q, 200);

  const filtered = useMemo(
    () =>
      options
        .filter((a) => a.toLowerCase().includes(debounced.toLowerCase()))
        .slice(0, 6),
    [debounced, options]
  );

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">
        Agency
      </label>

      <div className="relative">
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring hover:border-gray-400"
          placeholder="Type to search and press Enter"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && q.trim()) {
              const val = q.trim();
              if (!values.includes(val)) onAdd(val);
              setQ("");
            }
          }}
        />

        {debounced && (
          <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto text-black rounded-lg border bg-white p-1 text-sm shadow">
            {filtered.length ? (
              filtered.map((a) => (
                <li
                  key={a}
                  className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100"
                  onClick={() => {
                    if (!values.includes(a)) onAdd(a);
                    setQ("");
                  }}
                >
                  {a}
                </li>
              ))
            ) : (
              <li className="px-2 py-1 text-gray-500">No matches</li>
            )}
          </ul>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((v) => (
          <Chip key={v} onRemove={() => onRemove(v)}>
            {v}
          </Chip>
        ))}
      </div>
    </div>
  );
}
