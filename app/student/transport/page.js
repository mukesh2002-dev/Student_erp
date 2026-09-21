"use client";
import { transportInfo, busRouteTimeline, transportHistory, transportNotifications } from "@/data/transport";
import Badge from "@/components/Badge";
import { Bus, MapPin, Clock, Phone, Navigation, Bell, Calendar, Route as RouteIcon, Radio } from "lucide-react";
import { useState } from "react";

export default function TransportPage() {
  const [showRoute, setShowRoute] = useState(false);
  return (
    <div className="space-y-4 sm:space-y-6 max-w-6xl mx-auto w-full min-w-0 overflow-x-hidden">
      <div className="min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold leading-tight">Transport</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">View your school transport information — read-only</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#243044] min-w-0">
          <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">Bus Number</p>
          <p className="text-lg sm:text-xl font-bold mt-1 truncate">{transportInfo.busNumber}</p>
          <p className="text-xs text-slate-500 truncate">{transportInfo.route}</p>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#243044] min-w-0">
          <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">Driver</p>
          <p className="text-sm sm:text-base font-bold mt-1 truncate">{transportInfo.driver}</p>
          <p className="text-xs text-slate-500 flex items-center gap-1 truncate"><Phone className="w-3 h-3 shrink-0" />{transportInfo.driverPhone}</p>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#243044]">
          <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">Pickup</p>
          <p className="text-lg sm:text-xl font-bold mt-1">{transportInfo.pickupTime}</p>
          <p className="text-xs text-slate-500 truncate">{transportInfo.pickupStop}</p>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#243044]">
          <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">Drop</p>
          <p className="text-lg sm:text-xl font-bold mt-1">{transportInfo.dropTime}</p>
          <p className="text-xs text-slate-500">Bus Status: <span className="text-emerald-600 font-medium">{transportInfo.busStatus}</span></p>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-[#243044] flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0"><Bus className="w-5 h-5 sm:w-6 sm:h-6" /></div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm sm:text-base">Student Transport Details</h3>
            <p className="text-xs text-slate-500 truncate">{transportInfo.studentName} • {transportInfo.studentId} • {transportInfo.class}</p>
          </div>
          <Badge variant="success" className="ml-auto hidden sm:inline-flex">Active</Badge>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6">
          {[
            ["Student Name", transportInfo.studentName],
            ["Student ID", transportInfo.studentId],
            ["Class", transportInfo.class],
            ["Bus Number", transportInfo.busNumber],
            ["Route", transportInfo.routeName],
            ["Pickup Stop", transportInfo.pickupStop],
            ["Pickup Time", transportInfo.pickupTime],
            ["Drop Stop", transportInfo.dropStop],
            ["Expected Drop", transportInfo.dropTime],
            ["Driver", transportInfo.driver],
            ["Driver Phone", transportInfo.driverPhone],
            ["Status", transportInfo.status],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-[#172033] rounded-xl min-w-0 gap-2">
              <span className="text-xs sm:text-sm text-slate-500 shrink-0">{k}</span>
              <span className="text-xs sm:text-sm font-medium text-right truncate">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Route Timeline */}
        <div className="lg:col-span-3 bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044] min-w-0">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2"><RouteIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />Bus Route</h3>
            <button onClick={() => setShowRoute(!showRoute)} className="text-xs sm:text-sm font-medium text-indigo-600 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950">View Route</button>
          </div>
          <div className="relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-3 sm:space-y-4">
              {busRouteTimeline.map((r, i) => {
                const isPickup = r.stop === "Student Pickup";
                return (
                  <div key={i} className="relative flex gap-3 sm:gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${isPickup ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white dark:bg-[#111827] border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300"}`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${isPickup ? "bg-white" : "bg-indigo-600"}`} />
                    </div>
                    <div className={`flex-1 min-w-0 p-3 rounded-xl border ${isPickup ? "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800" : "bg-slate-50 dark:bg-[#172033] border border-slate-200 dark:border-[#243044]"}`}>
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm truncate">{r.stop}</p>
                        <span className="text-xs font-bold text-indigo-600 shrink-0">{r.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tracking + Notifications */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044]">
            <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2"><Radio className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 animate-pulse" />Live Tracking (Demo)</h3>
            <div className="mt-4 space-y-3">
              <div className="bg-slate-900 text-white rounded-2xl p-4 relative overflow-hidden min-h-[140px] flex flex-col justify-between">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-white/15 px-2.5 py-1 rounded-full flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />On Route</span>
                    <span className="text-xs text-white/70">{transportInfo.lastUpdated}</span>
                  </div>
                  <p className="font-bold mt-3 flex items-center gap-2"><Bus className="w-5 h-5" />{transportInfo.busNumber}</p>
                  <p className="text-sm text-white/80 flex items-center gap-1.5 mt-1"><MapPin className="w-4 h-4" />{transportInfo.currentLocation}</p>
                </div>
                <div className="relative mt-4 bg-white/10 rounded-xl p-3 flex items-center justify-between">
                  <div><p className="text-xs text-white/60">ETA School</p><p className="font-bold">{transportInfo.eta}</p></div>
                  <Navigation className="w-6 h-6 text-white/60" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3"><p className="text-slate-500">Bus</p><p className="font-semibold">{transportInfo.busNumber}</p></div>
                <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-3"><p className="text-slate-500">Status</p><p className="font-semibold text-emerald-700 dark:text-emerald-400">{transportInfo.busStatus}</p></div>
                <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3 col-span-2"><p className="text-slate-500">Estimated School Arrival</p><p className="font-semibold">{transportInfo.eta}</p></div>
              </div>
              <p className="text-[11px] text-slate-400 text-center">Demo only — no real GPS / Google Maps integration.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044]">
            <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2"><Bell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />Notifications</h3>
            <div className="mt-4 space-y-2.5">
              {transportNotifications.map(n => (
                <div key={n.id} className="p-3 rounded-xl border border-slate-200 dark:border-[#243044] bg-slate-50 dark:bg-[#172033]">
                  <p className="text-sm leading-snug">{n.message}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-[#243044]">
          <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2"><Calendar className="w-4 h-4 sm:w-5 sm:h-5" />Transport History</h3>
        </div>
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-slate-50 dark:bg-[#172033]"><tr><th className="text-left p-3">Date</th><th className="text-left p-3">Bus</th><th className="text-left p-3">Route</th><th className="text-center p-3">Pickup</th><th className="text-center p-3">Drop</th><th className="text-center p-3">Status</th></tr></thead>
            <tbody>
              {transportHistory.map((h, i) => (
                <tr key={i} className="border-t border-slate-100 dark:border-[#243044]">
                  <td className="p-3 font-medium">{h.date}</td><td className="p-3">{h.bus}</td><td className="p-3">{h.route}</td><td className="text-center p-3">{h.pickup}</td><td className="text-center p-3">{h.drop}</td><td className="text-center p-3"><Badge variant={h.status === "Completed" ? "success" : "danger"}>{h.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-slate-100 dark:divide-[#243044]">
          {transportHistory.map((h, i) => (
            <div key={i} className="p-4">
              <div className="flex items-center justify-between"><p className="font-medium text-sm">{h.date}</p><Badge variant={h.status === "Completed" ? "success" : "danger"}>{h.status}</Badge></div>
              <p className="text-xs text-slate-500 mt-1">{h.bus} • {h.route}</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-2.5"><p className="text-slate-500">Pickup</p><p className="font-medium">{h.pickup}</p></div>
                <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-2.5"><p className="text-slate-500">Drop</p><p className="font-medium">{h.drop}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
