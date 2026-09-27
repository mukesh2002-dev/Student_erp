import { ClipboardCheck, BookOpen, Layers, Star, Hourglass, CalendarDays, ClipboardList, Wallet } from "lucide-react";

const icons = {
  attendance: ClipboardCheck,
  homework: BookOpen,
  syllabus: Layers,
  marks: Star,
  pending: Hourglass,
  exam: CalendarDays,
  assignment: ClipboardList,
  fees: Wallet,
};

const colors = {
  indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300",
  cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-300",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-300",
};

/** Metric card with icon + value + trend/sub. */
export function StatCard({ label, value, sub, icon = "marks", color = "indigo" }) {
  const Icon = icons[icon] || Star;
  return (
    <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${colors[color] || colors.indigo}`}>
          <Icon className="w-4 h-4" />
        </span>
      </div>
      <p className="text-xl sm:text-2xl font-bold mt-2">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}
