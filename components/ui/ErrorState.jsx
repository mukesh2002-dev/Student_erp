"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";
import { getErrorMessage } from "@/lib/errors";

/** Full-section error with retry. */
export function ErrorState({ error, onRetry, message }) {
  const msg = message || getErrorMessage(error);
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
      <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center">
        <AlertTriangle className="w-6 h-6 text-red-500" />
      </div>
      <p className="font-semibold">Something went wrong</p>
      <p className="text-sm text-slate-500 max-w-md">{msg}</p>
      {onRetry && (
        <Button size="sm" onClick={onRetry} className="mt-1">
          Try again
        </Button>
      )}
    </div>
  );
}
