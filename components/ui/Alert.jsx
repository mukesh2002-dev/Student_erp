import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  info: { icon: Info, cls: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-900/50" },
  success: { icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900/50" },
  warning: { icon: AlertTriangle, cls: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900/50" },
  error: { icon: XCircle, cls: "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-900/50" },
};

/** Inline alert. */
export function Alert({ variant = "info", title, children, className }) {
  const t = tones[variant] || tones.info;
  const Icon = t.icon;
  return (
    <div className={cn("flex gap-3 rounded-xl border p-4 text-sm", t.cls, className)} role="alert">
      <Icon className="w-5 h-5 shrink-0" />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
