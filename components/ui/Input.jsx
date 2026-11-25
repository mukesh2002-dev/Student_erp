"use client";
import { useId } from "react";
import { cn } from "@/lib/utils";

/** Label + input + error + helper + icon. */
export function Input({ label, error, helper, icon: Icon, className, inputClassName, id, ...rest }) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="block text-[13px] font-medium text-ink-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" strokeWidth={1.5} />}
        <input
          id={inputId}
          className={cn(
            "h-10 w-full rounded-lg border bg-surface px-3.5 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-muted",
            Icon && "pl-9",
            error
              ? "border-negative/50 focus:border-negative"
              : "border-hairline focus:border-hairline-strong",
            inputClassName
          )}
          {...rest}
        />
      </div>
      {error && <p className="text-xs text-negative">{error}</p>}
      {helper && !error && <p className="text-xs text-ink-muted">{helper}</p>}
    </div>
  );
}
