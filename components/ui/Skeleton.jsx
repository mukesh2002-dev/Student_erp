import { cn } from "@/lib/utils";

/** Configurable skeleton block (theme-aware via .skeleton class). */
export function Skeleton({ className }) {
  return <div className={cn("skeleton rounded-lg", className)} style={{ minHeight: 16 }} />;
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
    <div className={cn("space-y-3 rounded-xl border border-hairline bg-surface p-5", className)}>
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-7 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

/** Full-page loading indicator. */
export function PageLoader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      <p className="text-sm text-ink-secondary">{message}</p>
    </div>
  );
}
