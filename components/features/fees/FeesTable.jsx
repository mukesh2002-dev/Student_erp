import { Card, CardBody } from "@/components/ui";
import { formatINR } from "@/lib/formatters";
import { FeesBadge } from "./FeesBadge";

/** Fee breakdown grid. */
export function FeesTable({ breakdown = [] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {breakdown.map((f) => (
        <Card key={f.name}>
          <CardBody className="flex items-center justify-between">
            <div>
              <p className="font-medium">{f.name}</p>
              <p className="text-sm text-slate-500">
                {formatINR(f.amount)} • Paid {formatINR(f.paid)}
              </p>
            </div>
            <FeesBadge status={f.status} />
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
