/** Compact metric tile. One figure, one line of context. */
export default function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface p-5">
      <p className="text-xs font-medium text-ink-muted">{label}</p>
      <p className="mt-2 text-2xl font-medium leading-7 tabular-nums text-ink">{value}</p>
      {sub && <p className="mt-1 truncate text-xs text-ink-secondary">{sub}</p>}
    </div>
  );
}
