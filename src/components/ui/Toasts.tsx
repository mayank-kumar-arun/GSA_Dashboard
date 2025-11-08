

export function Toasts({ toasts }: { toasts: { id: number; msg: string }[] }) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center p-4"
    >
      <div className="flex w-full max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto rounded-lg border text-black bg-white p-3 text-sm shadow"
          >
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
