"use client";
import { useState, useEffect } from "react";
import { initialLeaveRequests } from "@/data/leave";
import Badge from "@/components/Badge";

function readSavedLeaves() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("leaveRequests") || "null");
  } catch {
    return null;
  }
}

export default function LeavePage() {
  const [requests, setRequests] = useState(() => readSavedLeaves() || initialLeaveRequests);
  const [form, setForm] = useState({ type: "Sick Leave", from: "", to: "", reason: "" });

  // Persist to external system (localStorage) — no setState here, allowed.
  useEffect(() => {
    try {
      localStorage.setItem("leaveRequests", JSON.stringify(requests));
    } catch {}
  }, [requests]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.reason) return;
    const from = new Date(form.from);
    const to = new Date(form.to);
    const days = Math.max(1, Math.round((to - from) / (1000 * 60 * 60 * 24)) + 1);
    const newReq = { id: Date.now(), type: form.type, from: from.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }), to: to.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }), days, reason: form.reason, status: "Pending", appliedOn: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) };
    setRequests([newReq, ...requests]);
    setForm({ type: "Sick Leave", from: "", to: "", reason: "" });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div><h1 className="text-2xl font-bold">Leave Request</h1><p className="text-sm text-slate-500">Submit and track your leave applications</p></div>

      <form onSubmit={submit} className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044] space-y-4">
        <h3 className="font-semibold">Apply for Leave</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium">Leave Type</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none"><option>Sick Leave</option><option>Family Function</option><option>Medical</option><option>Other</option></select></div>
          <div><label className="text-sm font-medium">From Date</label><input type="date" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none" /></div>
          <div><label className="text-sm font-medium">To Date</label><input type="date" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} className="w-full mt-1 px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none" /></div>
          <div className="sm:col-span-2"><label className="text-sm font-medium">Reason</label><textarea value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} rows={3} placeholder="Reason for leave..." className="w-full mt-1 px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none" /></div>
        </div>
        <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">Submit Request</button>
      </form>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-[#243044]"><h3 className="font-semibold">Leave History</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-[#172033]"><tr><th className="text-left p-3">Type</th><th className="text-left p-3">From - To</th><th className="text-center p-3">Days</th><th className="text-left p-3">Reason</th><th className="text-center p-3">Status</th></tr></thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id} className="border-t border-slate-100 dark:border-[#243044]">
                  <td className="p-3 font-medium">{r.type}</td>
                  <td className="p-3 text-xs">{r.from} — {r.to}</td>
                  <td className="text-center p-3">{r.days}</td>
                  <td className="p-3 max-w-[200px] truncate">{r.reason}</td>
                  <td className="text-center p-3"><Badge variant={r.status === "Approved" ? "success" : r.status === "Pending" ? "warning" : "danger"}>{r.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
