import { cn } from "@/lib/utils";

const styles = {
  default: "bg-slate-100 text-slate-700 dark:bg-[#1E293B] dark:text-slate-300 border-slate-200 dark:border-[#243044]",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50",
  warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50",
  danger: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/50",
  info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50",
};

/** @param {{variant?: keyof typeof styles}} props */
export function Badge({ children, variant = "default", className }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border", styles[variant] || styles.default, className)}>
      {children}
    </span>
  );
}
