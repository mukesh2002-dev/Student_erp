import { Table } from "@/components/ui";
import { formatINR } from "@/lib/formatters";
import { FeesBadge } from "./FeesBadge";

const columns = [
  { key: "name", header: "Particular", render: (row) => <span className="font-medium text-ink">{row.name}</span> },
  { key: "amount", header: "Billed", align: "right", render: (row) => <span className="tabular-nums">{formatINR(row.amount)}</span> },
  { key: "paid", header: "Paid", align: "right", render: (row) => <span className="tabular-nums">{formatINR(row.paid)}</span> },
  { key: "status", header: "Status", align: "center", render: (row) => <FeesBadge status={row.status} /> },
];

/** Fee breakdown as a ledger, not a wall of cards. */
export function FeesTable({ breakdown = [] }) {
  return <Table columns={columns} rows={breakdown} emptyMessage="No fee heads configured" />;
}
