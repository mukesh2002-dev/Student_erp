export default function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-surface-sunken text-ink-secondary border-hairline",
    success: "bg-positive-soft text-positive border-transparent",
    warning: "bg-warning-soft text-warning border-transparent",
    danger: "bg-negative-soft text-negative border-transparent",
    indigo: "bg-accent-soft text-accent border-transparent",
  };
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-medium leading-4 ${
        styles[variant] || styles.default
      }`}
    >
      {children}
    </span>
  );
}
