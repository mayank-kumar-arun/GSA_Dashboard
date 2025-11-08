export function relativeDate(iso: string) {
  const now = new Date();
  const d = new Date(iso);
  const diff = Math.round((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "today";
  if (diff > 0) return `in ${diff} day${diff === 1 ? "" : "s"}`;
  return `${Math.abs(diff)} day${diff === -1 ? "" : "s"} ago`;
}
