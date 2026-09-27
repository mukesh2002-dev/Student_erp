"use client";
import { useId } from "react";
import { cn } from "@/lib/utils";

/** Styled select with label + error. */
export function Select({ label, error, className, children, id, ...rest }) {
  const autoId = useId();
  const selectId = id || autoId;
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "w-full rounded-xl border bg-white dark:bg-[#111827] px-4 py-2.5 text-sm outline-none text-slate-900 dark:text-slate-100",
          error ? "border-red-400" : "border-slate-200 dark:border-[#334155] focus:border-indigo-500"
        )}
        {...rest}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
