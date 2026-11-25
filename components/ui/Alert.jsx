import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  info: { icon: Info, cls: "border-hairline bg-accent-soft text-ink", rule: "bg-accent" },
  success: { icon: CheckCircle2, cls: "border-hairline bg-positive-soft text-ink", rule: "bg-positive" },
  warning: { icon: AlertTriangle, cls: "border-hairline bg-warning-soft text-ink", rule: "bg-warning" },
  error: { icon: XCircle, cls: "border-hairline bg-negative-soft text-ink", rule: "bg-negative" },
};

/** Inline alert with a coloured rule, not a coloured box. */
export function Alert({ variant = "info", title, children, className }) {
  const tone = tones[variant] || tones.info;
  const Icon = tone.icon;
  return (
    <div className={cn("relative overflow-hidden rounded-lg border px-4 py-3 pl-5 text-[13px]", tone.cls, className)} role="alert">
      <span className={cn("absolute inset-y-0 left-0 w-[2px]", tone.rule)} aria-hidden />
      <div className="flex gap-2.5">
        <Icon className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
        <div className="min-w-0">
          {title && <p className="font-medium text-ink">{title}</p>}
          <div className={title ? "mt-0.5 text-ink-secondary" : "text-ink-secondary"}>{children}</div>
        </div>
      </div>
    </div>
  );
}
