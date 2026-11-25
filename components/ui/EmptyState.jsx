import { Inbox } from "lucide-react";
import { Button } from "./Button";

/** Illustration + message + optional action. */
export function EmptyState({ title = "Nothing here yet", message = "No records found.", actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-surface-sunken">
        <Inbox className="h-5 w-5 text-ink-muted" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-medium text-ink">{title}</p>
      <p className="max-w-sm text-sm text-ink-secondary">{message}</p>
      {actionLabel && (
        <Button variant="secondary" size="sm" className="mt-2" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
