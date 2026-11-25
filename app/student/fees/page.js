"use client";
import { useFees, useFeesHistory, usePayFees } from "@/hooks/fees/useFees";
import {
  Alert, Badge, Card, CardBody, CardHeader, ErrorState, PageHeader, PageLoader, Table,
} from "@/components/ui";
import { FeesSummaryCard } from "@/components/features/fees/FeesSummaryCard";
import { FeesTable } from "@/components/features/fees/FeesTable";
import { FeesPayButton } from "@/components/features/fees/FeesPayButton";
import { formatINR } from "@/lib/formatters";

const historyColumns = [
  { key: "date", header: "Date" },
  { key: "particular", header: "Particular" },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (row) => <span className="font-medium tabular-nums text-ink">{formatINR(row.amount)}</span>,
  },
  { key: "method", header: "Method" },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (row) => <Badge variant="success">{row.status}</Badge>,
  },
];

/**
 * Fees page — thin composition layer only.
 * Data via TanStack Query (useFees), payment via usePayFees mutation.
 */
export default function FeesPage() {
  const { data: fees, isLoading, isError, error, refetch } = useFees();
  const { data: history } = useFeesHistory();
  const payMutation = usePayFees();

  if (isLoading) return <PageLoader message="Loading fee ledger..." />;
  if (isError) return <ErrorState error={error} onRetry={() => refetch()} />;
  if (!fees) return <ErrorState message="No fee record found." onRetry={() => refetch()} />;

  const rows = (history || fees.history || []).map((item, index) => ({ id: item.receipt || index, ...item }));

  return (
    <div className="enter mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Fees"
        description="Fee ledger and payment history · Session 2026-27"
        actions={fees.due > 0 ? <Badge variant="warning">{formatINR(fees.due)} due</Badge> : <Badge variant="success">Cleared</Badge>}
      />

      <FeesSummaryCard total={fees.total} paid={fees.paid} due={fees.due} nextDueDate={fees.nextDueDate} />

      {fees.due > 0 && (
        <Alert variant="warning" title={`${formatINR(fees.due)} due by ${fees.nextDueDate}`}>
          Pay before the due date to avoid a late fee on the next statement.
        </Alert>
      )}

      <Card>
        <CardHeader className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium text-ink">Fee heads</h2>
          <span className="record">{fees.breakdown.length} heads</span>
        </CardHeader>
        <FeesTable breakdown={fees.breakdown} />
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-sm font-medium text-ink">Make a payment</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-medium text-ink">Pay online</p>
              <p className="mt-0.5 text-xs text-ink-secondary">UPI, debit card or net banking</p>
            </div>
            <FeesPayButton
              due={fees.due}
              paying={payMutation.isPending}
              onPay={() => payMutation.mutate({ amount: fees.due, method: "Online" })}
            />
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
            <div className="bg-surface px-4 py-3">
              <p className="text-[13px] font-medium text-ink">Pay at school</p>
              <p className="mt-0.5 text-xs text-ink-secondary">Cash or cheque at the accounts office</p>
            </div>
            <div className="bg-surface px-4 py-3">
              <p className="text-[13px] font-medium text-ink">Raise a query</p>
              <p className="mt-0.5 text-xs text-ink-secondary">Contact accounts with your receipt number</p>
            </div>
          </div>

          <p className="record">Demo gateway — no real charge is made</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium text-ink">Payment history</h2>
          <span className="record">{rows.length} receipts</span>
        </CardHeader>
        <Table columns={historyColumns} rows={rows} emptyMessage="No payments recorded yet." />
      </Card>
    </div>
  );
}
