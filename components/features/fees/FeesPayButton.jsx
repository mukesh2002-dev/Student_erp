"use client";
import { Button } from "@/components/ui";
import { formatINR } from "@/lib/formatters";

/** Pay-now button with loading state — logic lives in page via usePayFees. */
export function FeesPayButton({ due, paying, onPay }) {
  return (
    <Button className="mt-4 w-full" loading={paying} onClick={onPay}>
      Pay {formatINR(due)} Now
    </Button>
  );
}
