import { useState } from "react";
import { Chip } from "../ui/Chips";

interface KeywordInputProps {
  values: string[];
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
}

export default function KeywordInput({
  values,
  onAdd,
  onRemove,
}: KeywordInputProps) {
  const [q, setQ] = useState("");

  return (
    <div className="w-full">
      <label
        className="block text-sm font-medium mb-1"
        style={{ color: "var(--text)" }}
      >
        Keywords
      </label>

      <input
        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring hover:border-gray-400"
        placeholder="Type a word and press Enter"
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
