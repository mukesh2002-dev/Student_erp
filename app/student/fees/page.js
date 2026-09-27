"use client";
import { Wallet, CreditCard, Receipt, AlertCircle } from "lucide-react";
import { useFees, useFeesHistory, usePayFees } from "@/hooks/fees/useFees";
import { PageHeader, Card, CardBody, CardHeader, Table, Alert, PageLoader, ErrorState } from "@/components/ui";
import { FeesSummaryCard } from "@/components/features/fees/FeesSummaryCard";
import { FeesTable } from "@/components/features/fees/FeesTable";
import { FeesPayButton } from "@/components/features/fees/FeesPayButton";
import { formatINR } from "@/lib/formatters";

/**
 * Fees page — thin composition layer only.
 * Data via TanStack Query (useFees), payment via usePayFees mutation.
 * No raw fetch, no manual loading flags.
 */
export default function FeesPage() {
  const { data: fees, isLoading, isError, error, refetch } = useFees();
  const { data: history } = useFeesHistory();
  const payMutation = usePayFees();

  if (isLoading) return <PageLoader message="Loading fees..." />;
  if (isError) return <ErrorState error={error} onRetry={() => refetch()} />;
  if (!fees) return <ErrorState message="No fees data found." onRetry={() => refetch()} />;

  const rows = (history || fees.history || []).map((h, i) => ({ id: h.receipt || i, ...h }));

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader title="Fees" description="Fee breakdown and payment history" />

      <FeesSummaryCard total={fees.total} paid={fees.paid} due={fees.due} nextDueDate={fees.nextDueDate} />

      {fees.due > 0 && (
        <Alert variant="warning">
          {formatINR(fees.due)} due by {fees.nextDueDate} — Pay now to avoid late fee.
        </Alert>
      )}

      <FeesTable breakdown={fees.breakdown} />

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Make Payment (demo — no gateway)</h3>
        </CardHeader>
        <CardBody>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 rounded-xl text-center">
              <CreditCard className="w-8 h-8 mx-auto text-indigo-600" />
              <p className="text-sm font-medium mt-2">Pay Online</p>
              <p className="text-xs text-slate-500">UPI / Card / Net Banking</p>
            </div>
            <div className="p-4 border border-slate-200 dark:border-[#243044] rounded-xl text-center">
              <Wallet className="w-8 h-8 mx-auto text-slate-400" />
              <p className="text-sm font-medium mt-2">Pay at School</p>
              <p className="text-xs text-slate-500">Cash / Cheque</p>
            </div>
            <div className="p-4 border border-slate-200 dark:border-[#243044] rounded-xl text-center">
              <Receipt className="w-8 h-8 mx-auto text-slate-400" />
              <p className="text-sm font-medium mt-2">Raise Query</p>
              <p className="text-xs text-slate-500">Contact accounts</p>
            </div>
          </div>
          <FeesPayButton
            due={fees.due}
            paying={payMutation.isPending}
            onPay={() => payMutation.mutate({ amount: fees.due, method: "Online" })}
          />
          <p className="text-xs text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" /> No real gateway — demo UI backed by /api/fees/pay
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Payment History</h3>
        </CardHeader>
        <Table
          columns={[
            { key: "date", header: "Date" },
            { key: "particular", header: "Particular" },
            { key: "amount", header: "Amount", align: "right", render: (r) => <span className="font-medium">{formatINR(r.amount)}</span> },
            { key: "method", header: "Method", align: "center" },
            { key: "status", header: "Status", align: "center", render: (r) => <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{r.status}</span> },
          ]}
          rows={rows}
          emptyMessage="No payments yet."
        />
      </Card>
    </div>
  );
}
