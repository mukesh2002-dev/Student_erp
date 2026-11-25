"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";
import { getErrorMessage } from "@/lib/errors";

/** Full-section error with retry. */
export function ErrorState({ error, onRetry, message }) {
  const msg = message || getErrorMessage(error);
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-negative/20 bg-negative-soft">
        <AlertTriangle className="h-5 w-5 text-negative" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-medium text-ink">Something went wrong</p>
      <p className="max-w-md text-sm text-ink-secondary">{msg}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-1" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
