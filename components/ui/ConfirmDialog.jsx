"use client";
import { Modal } from "./Modal";
import { Button } from "./Button";

/** "Are you sure?" dialog for destructive actions. */
export function ConfirmDialog({ open, title = "Are you sure?", message, confirmLabel = "Confirm", onConfirm, onClose, danger = true }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>
      <div className="flex justify-end gap-2 mt-5">
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
