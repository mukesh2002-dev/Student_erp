"use client";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";
import { EmptyState } from "./EmptyState";

/**
 * Responsive table with loading + empty states built in.
 * @param {{columns: {key:string,header:string,align?:string,render?:Function}[], rows:any[], loading?:boolean, emptyMessage?:string}} props
 */
export function Table({ columns, rows = [], loading = false, emptyMessage = "No records found", className }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!rows.length) {
    return <EmptyState message={emptyMessage} />;
  }
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-hairline bg-surface-raised">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "whitespace-nowrap px-5 py-2.5 font-medium text-ink-muted",
                  column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id ?? index}
              className="border-b border-hairline transition-colors last:border-b-0 hover:bg-surface-raised"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "px-5 py-3 text-ink-secondary",
                    column.align === "right" && "text-right tabular-nums",
                    column.align === "center" && "text-center"
                  )}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
