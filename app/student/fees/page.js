"use client";
import { feesData } from "@/data/fees";
import Badge from "@/components/Badge";
import { Wallet, CreditCard, Receipt, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function FeesPage() {
  const [paid, setPaid] = useState(false);
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div><h1 className="text-2xl font-bold">Fees</h1><p className="text-sm text-slate-500">Fee breakdown and payment history</p></div>

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div><p className="text-indigo-100 text-sm">Total Fees</p><p className="text-2xl font-bold">₹{feesData.total.toLocaleString()}</p></div>
          <div><p className="text-indigo-100 text-sm">Paid</p><p className="text-2xl font-bold">₹{feesData.paid.toLocaleString()}</p></div>
          <div className="bg-white/15 rounded-xl p-3"><p className="text-indigo-100 text-sm">Due</p><p className="text-2xl font-bold">₹{feesData.due.toLocaleString()}</p><p className="text-xs text-indigo-100">Due {feesData.nextDueDate}</p></div>
        </div>
        {feesData.due > 0 && <div className="mt-4 bg-amber-400 text-amber-900 rounded-xl p-3 flex items-center gap-2 text-sm font-medium"><AlertCircle className="w-4 h-4" />₹{feesData.due} due by {feesData.nextDueDate} — Pay now to avoid late fee.</div>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {feesData.breakdown.map(f => (
          <div key={f.name} className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044] flex items-center justify-between">
            <div><p className="font-medium">{f.name}</p><p className="text-sm text-slate-500">₹{f.amount.toLocaleString()} • Paid ₹{f.paid.toLocaleString()}</p></div>
            <Badge variant={f.status === "Paid" ? "success" : "warning"}>{f.status}</Badge>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
        <h3 className="font-semibold mb-4">Make Payment (UI only)</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="p-4 border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 rounded-xl text-center"><CreditCard className="w-8 h-8 mx-auto text-indigo-600" /><p className="text-sm font-medium mt-2">Pay Online</p><p className="text-xs text-slate-500">UPI / Card / Net Banking</p></div>
          <div className="p-4 border border-slate-200 dark:border-[#243044] rounded-xl text-center"><Wallet className="w-8 h-8 mx-auto text-slate-400" /><p className="text-sm font-medium mt-2">Pay at School</p><p className="text-xs text-slate-500">Cash / Cheque</p></div>
          <div className="p-4 border border-slate-200 dark:border-[#243044] rounded-xl text-center"><Receipt className="w-8 h-8 mx-auto text-slate-400" /><p className="text-sm font-medium mt-2">Raise Query</p><p className="text-xs text-slate-500">Contact accounts</p></div>
        </div>
        {!paid ? <button onClick={() => setPaid(true)} className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">Pay ₹{feesData.due.toLocaleString()} Now</button> : <p className="mt-4 text-center py-3 bg-emerald-50 text-emerald-700 rounded-xl font-medium">Payment simulated — receipt will be generated (demo).</p>}
        <p className="text-xs text-slate-500 text-center mt-2">No real gateway — demo UI only</p>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-[#243044]"><h3 className="font-semibold">Payment History</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-[#172033]"><tr><th className="text-left p-3">Date</th><th className="text-left p-3">Particular</th><th className="text-right p-3">Amount</th><th className="text-center p-3">Method</th><th className="text-center p-3">Status</th></tr></thead>
            <tbody>
              {feesData.history.map((h, i) => <tr key={i} className="border-t border-slate-100 dark:border-[#243044]"><td className="p-3">{h.date}</td><td className="p-3">{h.particular}</td><td className="text-right p-3 font-medium">₹{h.amount}</td><td className="text-center p-3">{h.method}</td><td className="text-center p-3"><Badge variant="success">{h.status}</Badge></td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
