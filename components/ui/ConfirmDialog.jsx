"use client";
import { Modal } from "./Modal";
import { Button } from "./Button";

/** "Are you sure?" dialog for destructive actions. */
export function ConfirmDialog({ open, title = "Are you sure?", message, confirmLabel = "Confirm", onConfirm, onClose, danger = true }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-[13px] leading-6 text-ink-secondary">{message}</p>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="sm"
          variant={danger ? "danger" : "primary"}
          onClick={() => {
            onConfirm?.();
            onClose?.();
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
