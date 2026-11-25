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
        <label htmlFor={selectId} className="block text-[13px] font-medium text-ink-secondary">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "h-10 w-full rounded-lg border bg-surface px-3 text-[13px] text-ink outline-none transition-colors",
          error ? "border-negative/50 focus:border-negative" : "border-hairline focus:border-hairline-strong"
        )}
        {...rest}
      >
        {children}
      </select>
      {error && <p className="text-xs text-negative">{error}</p>}
    </div>
  );
}
