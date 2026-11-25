import { formatINR } from "@/lib/formatters";

/** Ledger strip: billed, paid, outstanding — one surface, divided by hairlines. */
export function FeesSummaryCard({ total, paid, due, nextDueDate }) {
  const paidPercent = Math.round((paid / total) * 100);

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface">
      <div className="grid grid-cols-3 gap-px bg-hairline">
        <div className="bg-surface p-5">
          <p className="text-xs font-medium text-ink-muted">Billed</p>
          <p className="mt-2 text-[22px] font-medium leading-7 tabular-nums text-ink">{formatINR(total)}</p>
          <p className="mt-1 text-xs text-ink-secondary">Session 2026-27</p>
        </div>
        <div className="bg-surface p-5">
          <p className="text-xs font-medium text-ink-muted">Paid</p>
          <p className="mt-2 text-[22px] font-medium leading-7 tabular-nums text-ink">{formatINR(paid)}</p>
          <p className="mt-1 text-xs text-ink-secondary">{paidPercent}% of billed</p>
        </div>
        <div className="bg-surface p-5">
          <p className="text-xs font-medium text-ink-muted">Outstanding</p>
          <p className="mt-2 text-[22px] font-medium leading-7 tabular-nums text-ink">{formatINR(due)}</p>
          <p className="mt-1 text-xs text-ink-secondary">Due {nextDueDate}</p>
        </div>
      </div>
      <div className="h-1 w-full bg-surface-sunken">
        <div className="h-full bg-accent" style={{ width: `${paidPercent}%` }} />
      </div>
    </div>
  );
}
