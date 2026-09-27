import { Inbox } from "lucide-react";
import { Button } from "./Button";

/** Illustration + message + optional action. */
export function EmptyState({ title = "Nothing here yet", message = "No records found.", actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center">
        <Inbox className="w-6 h-6 text-slate-400" />
      </div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-slate-500 max-w-sm">{message}</p>
      {actionLabel && (
        <Button variant="secondary" size="sm" className="mt-2" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
