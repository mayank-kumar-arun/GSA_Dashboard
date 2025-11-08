import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/cn";

interface ListboxProps {
  label: string;
  value?: string;
  onChange: (v?: string) => void;
  options: string[];
  id: string;
}

export default function Listbox({
  label,
  value,
  onChange,
  options,
  id,
}: ListboxProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        listRef.current &&
        btnRef.current &&
        !listRef.current.contains(e.target as Node) &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>

      <button
        id={id}
        ref={btnRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between rounded-lg border bg-white px-3 py-2 text-left text-sm focus:outline-none focus:ring hover:border-gray-400"
      >
        <span className="text-black">{value || "Select…"}</span>
        <span className="text-gray-500">▾</span>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          className="mt-1 max-h-60 w-full overflow-auto rounded-lg text-black border bg-white p-1 text-sm shadow"
        >
          <li
            role="option"
            aria-selected={!value}
            className="cursor-pointer rounded px-2 py-1 text-black hover:bg-gray-100"
            onClick={() => {
              onChange(undefined);
              setOpen(false);
            }}
          >
            — Any —
          </li>

          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              className={cn(
                "cursor-pointer rounded px-2 py-1 text-black hover:bg-gray-100",
                value === opt && "bg-gray-900 hover:bg-gray-900"
              )}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
