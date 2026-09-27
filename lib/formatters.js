import { format } from "date-fns";

/** Date / currency / number formatting helpers (pure, no React). */

export function formatDate(date, pattern = "dd MMM yyyy") {
  if (!date) return "—";
  try {
    const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
    return format(d, pattern);
  } catch {
    return String(date);
  }
}

export function formatCurrency(amount, currency = "INR", locale = "en-IN") {
  if (amount == null || Number.isNaN(Number(amount))) return "—";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  } catch {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  }
}

/** Shorthand rupee formatter used across ERP cards/tables. */
export function formatINR(amount) {
  if (amount == null) return "—";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export function formatNumber(n) {
  if (n == null) return "—";
  return Number(n).toLocaleString("en-IN");
}

export function formatPercent(value, digits = 1) {
  if (value == null) return "—";
  return `${Number(value).toFixed(digits)}%`;
}
