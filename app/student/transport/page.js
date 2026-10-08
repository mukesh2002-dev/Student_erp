"use client";
import { useEffect, useState } from "react";
import { studentService } from "@/services/student.service";
import { Bus, Phone, Route as RouteIcon, User } from "lucide-react";

export default function TransportPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await studentService.getTransport();
        if (!cancelled) setData(res ?? null);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Could not load transport details");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const a = data?.assignment ?? null;
  const route = data?.route ?? null;
  const vehicle = data?.vehicle ?? null;
  const driver = data?.driver ?? null;
  const stops = data?.stops ?? [];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-6xl mx-auto w-full min-w-0 overflow-x-hidden">
      <div className="min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold leading-tight">Transport</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Your bus, route and pickup details — read-only</p>
      </div>

      {loading && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-10 border border-slate-200 dark:border-[#243044] text-center text-sm text-slate-500">
          Loading transport details…
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-2xl p-5 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && data && !data.onTransport && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-10 border border-slate-200 dark:border-[#243044] text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 dark:bg-[#172033] flex items-center justify-center text-slate-400">
            <Bus className="w-7 h-7" />
          </div>
          <p className="font-semibold">You are not enrolled in school transport</p>
          <p className="text-sm text-slate-500">Contact the school office to get a bus route assigned.</p>
        </div>
      )}

      {!loading && !error && data?.onTransport && (
        <>
          {/* Top cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#243044] min-w-0">
              <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">Bus Number</p>
              <p className="text-lg sm:text-xl font-bold mt-1 truncate">{vehicle?.registrationNumber ?? "—"}</p>
              <p className="text-xs text-slate-500 truncate">{route?.name ?? ""}</p>
            </div>
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#243044] min-w-0">
              <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">Driver</p>
              <p className="text-sm sm:text-base font-bold mt-1 truncate">{driver?.name ?? "—"}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                <Phone className="w-3 h-3 shrink-0" />
                {driver?.phone ?? "—"}
              </p>
            </div>
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#243044] min-w-0">
              <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">Pickup</p>
              <p className="text-lg sm:text-xl font-bold mt-1">{a?.pickupTime ?? route?.startTime ?? "—"}</p>
              <p className="text-xs text-slate-500 truncate">{a?.stopName ?? "—"}</p>
            </div>
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#243044] min-w-0">
              <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">Bus Status</p>
              <p className="text-lg sm:text-xl font-bold mt-1">{route?.startTime ?? "—"} → {route?.endTime ?? "—"}</p>
              <p className="text-xs text-slate-500">
                Status:{" "}
                <span className={`font-medium ${a?.status === "ACTIVE" ? "text-emerald-600" : "text-amber-600"}`}>
                  {a?.status ?? "—"}
                </span>
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-[#243044] flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bus className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base">Transport Details</h3>
                <p className="text-xs text-slate-500 truncate">{route?.name}</p>
              </div>
              <span
                className={`ml-auto text-[11px] px-2.5 py-1 rounded-full font-medium ${
                  a?.status === "ACTIVE"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                }`}
              >
                {a?.status === "ACTIVE" ? "Active" : a?.status}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6">
              {[
                ["Route", route?.name],
                ["Bus Number", vehicle?.registrationNumber],
                ["Vehicle", vehicle ? `${vehicle.brand ?? ""} ${vehicle.model ?? ""}`.trim() || vehicle.vehicleType : null],
                ["Capacity", vehicle?.capacity ? `${vehicle.capacity} seats` : null],
                ["Pickup Stop", a?.stopName],
                ["Pickup Time", a?.pickupTime ?? route?.startTime],
                ["Route Timing", route ? `${route.startTime} – ${route.endTime}` : null],
                ["Distance", route?.totalKm ? `${route.totalKm} km` : null],
                ["Driver", driver?.name],
                ["Driver Phone", driver?.phone],
                ["Assigned From", a?.startDate],
                ["Status", a?.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-[#172033] rounded-xl min-w-0 gap-2">
                  <span className="text-xs sm:text-sm text-slate-500 shrink-0">{k}</span>
                  <span className="text-xs sm:text-sm font-medium text-right truncate">{v ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-4 sm:gap-6">
            {/* Route timeline */}
            <div className="lg:col-span-3 bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044] min-w-0">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
                  <RouteIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  Bus Route — {stops.length} stops
                </h3>
                <span className="text-xs text-slate-500">{route?.startTime} → {route?.endTime}</span>
              </div>
              <div className="relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
                <div className="space-y-3 sm:space-y-4">
                  {stops.map((s) => (
                    <div key={s.uuid} className="relative flex gap-3 sm:gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${
                          s.isPickup
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "bg-white dark:bg-[#111827] border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full ${s.isPickup ? "bg-white" : "bg-indigo-600"}`} />
                      </div>
                      <div
                        className={`flex-1 min-w-0 p-3 rounded-xl border ${
                          s.isPickup
                            ? "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800"
                            : "bg-slate-50 dark:bg-[#172033] border border-slate-200 dark:border-[#243044]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-sm truncate">
                            {s.name}
                            {s.isPickup && (
                              <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-indigo-600 text-white align-middle">Your stop</span>
                            )}
                          </p>
                          <span className="text-xs font-bold text-indigo-600 shrink-0">{s.arrivalTime ?? "—"}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          {s.landmark ?? `Stop ${s.sequence}`}
                        </p>
                      </div>
                    </div>
                  ))}
                  {stops.length === 0 && (
                    <p className="text-sm text-slate-500">No stops published for this route yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Driver + details side column */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
              {/* Driver card */}
              <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044]">
                <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" /> Driver
                </h3>
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#172033] text-sm">
                    <span className="text-slate-500">Name</span>
                    <span className="font-medium">{driver?.name ?? "—"}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#172033] text-sm">
                    <span className="text-slate-500">Phone</span>
                    <a href={driver?.phone ? `tel:${driver.phone}` : undefined} className="font-medium text-indigo-600 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {driver?.phone ?? "—"}
                    </a>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#172033] text-sm">
                    <span className="text-slate-500">Status</span>
                    <span className="font-medium">{driver?.status ?? "—"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
