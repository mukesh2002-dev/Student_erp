"use client";
import { cn } from "@/lib/utils";

/**
 * @param {object} props
 * @param {"primary"|"secondary"|"danger"|"ghost"} [props.variant]
 * @param {"sm"|"md"|"lg"} [props.size]
 * @param {boolean} [props.loading]
 */
export function Button({ variant = "primary", size = "md", loading = false, className, children, disabled, ...rest }) {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 border border-transparent",
    secondary:
      "bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#243044] hover:bg-slate-50 dark:hover:bg-[#1E293B]",
    danger: "bg-red-600 text-white hover:bg-red-700 border border-transparent",
    ghost: "bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1E293B] border border-transparent",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg min-h-[36px]",
    md: "px-4 py-2.5 text-sm rounded-xl min-h-[44px]",
    lg: "px-6 py-3 text-base rounded-xl min-h-[48px]",
  };
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}
