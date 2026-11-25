import { Inbox } from "lucide-react";

export default function EmptyState({ title, description, icon }) {
  return (
    <div className="rounded-xl border border-dashed border-hairline-strong bg-surface px-6 py-12 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-surface-sunken text-ink-muted">
        {icon || <Inbox className="h-5 w-5" strokeWidth={1.5} />}
      </div>
      <p className="text-sm font-medium text-ink">{title || "Nothing here yet"}</p>
      {description && <p className="mx-auto mt-1 max-w-sm text-[13px] text-ink-secondary">{description}</p>}
    </div>
  );
}
