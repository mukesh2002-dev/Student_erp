import { cn } from "@/lib/utils";

/** Configurable skeleton block (theme-aware via .skeleton class). */
export function Skeleton({ className }) {
  return <div className={cn("skeleton rounded-xl", className)} style={{ minHeight: 16 }} />;
}

/** Skeleton rows for tables. */
export function TableSkeleton({ rows = 5, className }) {
  return (
    <div className={cn("space-y-2 p-4", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
}

/** Skeleton for stat/dashboard cards. */
export function CardSkeleton({ className }) {
  return (
    <div className={cn("rounded-2xl border border-slate-200 dark:border-[#243044] p-5 space-y-3 bg-white dark:bg-[#111827]", className)}>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

/** Full-page loading overlay. */
export function PageLoader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <span className="w-10 h-10 border-[3px] rounded-full border-indigo-600 border-t-transparent animate-spin" />
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}
