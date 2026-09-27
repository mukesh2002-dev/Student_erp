"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Accessible modal: backdrop click + ESC to close. */
export function Modal({ open, onClose, title, children, className }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn("w-full max-w-lg rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044] shadow-xl", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-[#243044]">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B]">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
