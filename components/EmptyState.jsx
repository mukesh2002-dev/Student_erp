export default function EmptyState({ title, description, icon }) {
  return (
    <div className="text-center py-16 px-6 bg-white dark:bg-[#111827] rounded-2xl border border-dashed border-slate-300 dark:border-[#243044]">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] flex items-center justify-center text-2xl mb-4">{icon || "📭"}</div>
      <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
  );
}
