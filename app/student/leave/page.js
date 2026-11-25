"use client";
import { useState } from "react";
import { initialLeaveRequests } from "@/data/leave";
import { Badge, Button, Card, CardBody, CardHeader, Input, PageHeader, Select, Table } from "@/components/ui";

const statusVariant = { Approved: "success", Pending: "warning", Rejected: "danger" };

const columns = [
  { key: "type", header: "Type", render: (row) => <span className="font-medium text-ink">{row.type}</span> },
  { key: "period", header: "Period", render: (row) => <span className="tabular-nums">{row.from} — {row.to}</span> },
  { key: "days", header: "Days", align: "right", render: (row) => <span className="tabular-nums">{row.days}</span> },
  { key: "reason", header: "Reason", render: (row) => <span className="block max-w-[280px] truncate">{row.reason}</span> },
  { key: "appliedOn", header: "Applied", render: (row) => <span className="tabular-nums">{row.appliedOn}</span> },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (row) => <Badge variant={statusVariant[row.status] || "default"}>{row.status}</Badge>,
  },
];

function readSavedLeaves() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("leaveRequests") || "null");
  } catch {
    return null;
  }
}

const emptyForm = { type: "Sick Leave", from: "", to: "", reason: "" };

export default function LeavePage() {
  const [requests, setRequests] = useState(() => readSavedLeaves() || initialLeaveRequests);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  // Write-only persistence to localStorage — never sets state, so safe in an effect.
  // No try/catch noise: a full quota should not break the form.
  const persist = (next) => {
    try {
      localStorage.setItem("leaveRequests", JSON.stringify(next));
    } catch {
      /* storage unavailable — keep the in-memory list */
    }
  };

  const update = (key) => (event) => {
    const value = event.target.value;
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.from || !form.to || !form.reason.trim()) {
      setError("Add the leave dates and a reason before submitting.");
      return;
    }
    setError("");

    const from = new Date(form.from);
    const to = new Date(form.to);
    const days = Math.max(1, Math.round((to - from) / 86400000) + 1);
    const format = (date) => date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

    const request = {
      id: Date.now(),
      type: form.type,
      from: format(from),
      to: format(to),
      days,
      reason: form.reason.trim(),
      status: "Pending",
      appliedOn: format(new Date()),
    };

    const next = [request, ...requests];
    setRequests(next);
    persist(next);
    setForm(emptyForm);
  };

  const pending = requests.filter((request) => request.status === "Pending").length;

  return (
    <div className="enter mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Leave request"
        description="Submit and track your leave applications · Session 2026-27"
        actions={
          pending > 0 ? <Badge variant="warning">{pending} awaiting approval</Badge> : <Badge variant="success">None pending</Badge>
        }
      />

      <Card>
        <CardHeader>
          <h2 className="text-sm font-medium text-ink">New application</h2>
          <p className="mt-0.5 text-xs text-ink-secondary">Approved leave is recorded against the class register.</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={submit} noValidate className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <Select label="Leave type" value={form.type} onChange={update("type")}>
                <option>Sick Leave</option>
                <option>Family Function</option>
                <option>Medical</option>
                <option>Other</option>
              </Select>
              <Input label="From" type="date" value={form.from} onChange={update("from")} required />
              <Input label="To" type="date" value={form.to} onChange={update("to")} required />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="leave-reason" className="block text-[13px] font-medium text-ink-secondary">
                Reason
              </label>
              <textarea
                id="leave-reason"
                value={form.reason}
                onChange={update("reason")}
                rows={3}
                placeholder="Reason for leave"
                className="w-full rounded-lg border border-hairline bg-surface px-3.5 py-2.5 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-hairline-strong"
              />
            </div>

            {error && (
              <p role="alert" className="text-[13px] text-negative">
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4">
              <p className="record">Class teacher approval · Rajesh Kumar</p>
              <Button type="submit">Submit request</Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium text-ink">Leave history</h2>
          <span className="record">{requests.length} applications</span>
        </CardHeader>
        <Table columns={columns} rows={requests} emptyMessage="No leave applications filed yet." />
      </Card>

      <p className="record">Prototype record — stored in this browser only</p>
    </div>
  );
}
