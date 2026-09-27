"use client";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import { QUERY_KEYS } from "@/lib/constants";

/** GET /api/dashboard */
export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: dashboardService.getDashboard,
  });
}
