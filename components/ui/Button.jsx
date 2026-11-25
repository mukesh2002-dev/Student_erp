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
    primary: "border border-transparent bg-accent text-accent-on hover:bg-accent-hover",
    secondary:
      "border border-hairline bg-surface text-ink hover:bg-surface-sunken",
    danger: "border border-transparent bg-negative text-white hover:opacity-90",
    ghost: "border border-transparent bg-transparent text-ink-secondary hover:bg-surface-sunken hover:text-ink",
  };
  const sizes = {
    sm: "h-8 px-3 text-xs rounded-md",
    md: "h-10 px-4 text-[13px] rounded-lg",
    lg: "h-11 px-5 text-sm rounded-lg",
  };
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
}
