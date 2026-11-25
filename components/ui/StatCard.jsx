/** Metric cell: label, figure, and one line of context. No icons, no sparklines. */
export function StatCard({ label, value, sub, className }) {
  return (
    <div className={`bg-surface p-5 ${className || ""}`}>
      <p className="text-xs font-medium text-ink-muted">{label}</p>
      <p className="mt-2 text-[28px] font-medium leading-8 tabular-nums text-ink">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink-secondary">{sub}</p>}
    </div>
  );
}
