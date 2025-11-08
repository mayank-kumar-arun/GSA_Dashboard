import { Chip } from "../ui/Chips";

interface MultiChipsProps {
  label: string;
  options: string[];
  values: string[];
  onToggle: (v: string) => void;
}

export default function MultiChips({ label, options, values, onToggle }: MultiChipsProps) {
  return (
    <div className="w-full">
      <div className="text-sm font-medium mb-1">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <Chip
            key={o}
            asButton
            selected={values.includes(o)}
            onClick={() => onToggle(o)}
            ariaLabel={`${values.includes(o) ? "Deselect" : "Select"} ${o}`}
          >
            {o}
          </Chip>
        ))}
      </div>
    </div>
  );
}
