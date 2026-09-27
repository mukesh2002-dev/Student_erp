"use client";

/** Hover tooltip (CSS-only, no dependency). */
export function Tooltip({ label, children }) {
  return (
    <span className="relative inline-flex group">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg bg-slate-900 dark:bg-slate-700 text-white text-xs px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition">
        {label}
      </span>
    </span>
  );
}
