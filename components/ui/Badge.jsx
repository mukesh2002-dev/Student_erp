import { cn } from "@/lib/utils";

const styles = {
  default: "border-hairline bg-surface-sunken text-ink-secondary",
  success: "border-transparent bg-positive-soft text-positive",
  warning: "border-transparent bg-warning-soft text-warning",
  danger: "border-transparent bg-negative-soft text-negative",
  indigo: "border-transparent bg-accent-soft text-accent",
  info: "border-transparent bg-accent-soft text-accent",
};

/** @param {{variant?: keyof typeof styles}} props */
export function Badge({ children, variant = "default", className }) {
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium leading-4", styles[variant] || styles.default, className)}>
      {children}
    </span>
  );
}
