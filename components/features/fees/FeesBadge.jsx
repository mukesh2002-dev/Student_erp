import { Badge } from "@/components/ui";

/** Status pill for a fee row. */
export function FeesBadge({ status }) {
  const variant = status === "Paid" ? "success" : status === "Partial" ? "warning" : "danger";
  return <Badge variant={variant}>{status}</Badge>;
}
