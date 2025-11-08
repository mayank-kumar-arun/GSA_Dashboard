import { cn } from "../../utils/cn";

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  asButton?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  ariaLabel?: string;
}

export function Chip({
  children,
  selected,
  asButton,
  onClick,
  onRemove,
  ariaLabel,
}: ChipProps) {
  return (
    <span
      role={asButton ? "button" : undefined}
      tabIndex={asButton ? 0 : -1}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs",
        selected
          ? "bg-gray-900 text-white border-gray-900"
          : "bg-gray-100 text-gray-800 border-gray-300",
        asButton && "cursor-pointer hover:shadow"
      )}
    >
      {children}
      {onRemove && (
        <button
          aria-label="Remove"
          className="ml-1 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}
