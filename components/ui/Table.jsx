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
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-[#172033]">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn("p-3 font-medium text-slate-600 dark:text-slate-300", c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left")}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i} className="border-t border-slate-100 dark:border-[#243044]">
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={cn("p-3", c.align === "right" && "text-right", c.align === "center" && "text-center")}
                >
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
