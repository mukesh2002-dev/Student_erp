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
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
        <input
          id={inputId}
          className={cn(
            "w-full rounded-xl border bg-white dark:bg-[#111827] px-4 py-2.5 text-sm outline-none transition text-slate-900 dark:text-slate-100 placeholder:text-slate-400",
            Icon && "pl-10",
            error
              ? "border-red-400 focus:border-red-500"
              : "border-slate-200 dark:border-[#334155] focus:border-indigo-500",
            inputClassName
          )}
          {...rest}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {helper && !error && <p className="text-xs text-slate-500">{helper}</p>}
    </div>
  );
}
