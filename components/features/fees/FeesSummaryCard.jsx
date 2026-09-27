import { formatINR } from "@/lib/formatters";

/** Summary banner: total / paid / due. */
export function FeesSummaryCard({ total, paid, due, nextDueDate }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
      <div className="grid sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-indigo-100 text-sm">Total Fees</p>
          <p className="text-2xl font-bold">{formatINR(total)}</p>
        </div>
        <div>
          <p className="text-indigo-100 text-sm">Paid</p>
          <p className="text-2xl font-bold">{formatINR(paid)}</p>
        </div>
        <div className="bg-white/15 rounded-xl p-3">
          <p className="text-indigo-100 text-sm">Due</p>
          <p className="text-2xl font-bold">{formatINR(due)}</p>
          <p className="text-xs text-indigo-100">Due {nextDueDate}</p>
        </div>
      </div>
    </div>
  );
}
