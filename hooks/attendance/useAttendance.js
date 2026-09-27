"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { attendanceService } from "@/services/attendance.service";
import { QUERY_KEYS } from "@/lib/constants";
import { getErrorMessage } from "@/lib/errors";

/** GET /api/attendance */
export function useAttendance(params) {
  return useQuery({
    queryKey: QUERY_KEYS.attendance(params),
    queryFn: () => attendanceService.getSummary(params),
  });
}

/** POST /api/attendance/leave */
export function useRequestLeave() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => attendanceService.markLeave(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attendance"] });
      toast.success("Leave request submitted");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}
