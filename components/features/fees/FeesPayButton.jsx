"use client";
import { Button } from "@/components/ui";
import { formatINR } from "@/lib/formatters";

/** Pay-now button with loading state — logic lives in page via usePayFees. */
export function FeesPayButton({ due, paying, onPay, className = "w-full sm:w-auto" }) {
  return (
    <Button className={className} loading={paying} onClick={onPay}>
      Pay {formatINR(due)} now
    </Button>
  );
}
