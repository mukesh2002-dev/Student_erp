export default function ProgressBar({ value, color = "indigo" }) {
  const colors = { indigo: "bg-indigo-600", emerald: "bg-emerald-500", blue: "bg-blue-500", orange: "bg-orange-500", rose: "bg-rose-500" };
  return (
    <div className="w-full h-2 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${colors[color] || colors.indigo}`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}
