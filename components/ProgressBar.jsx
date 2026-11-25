export default function ProgressBar({ value, color = "indigo", label }) {
  const colors = {
    indigo: "bg-accent",
    emerald: "bg-positive",
    blue: "bg-accent",
    orange: "bg-warning",
    rose: "bg-negative",
  };
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken"
      role="progressbar"
      aria-valuenow={Math.min(100, Math.max(0, value))}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${colors[color] || colors.indigo}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
