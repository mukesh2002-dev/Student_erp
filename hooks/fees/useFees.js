"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { feesService } from "@/services/fees.service";
import { QUERY_KEYS } from "@/lib/constants";
import { getErrorMessage } from "@/lib/errors";

/** GET /api/fees */
export function useFees() {
  return useQuery({
    queryKey: QUERY_KEYS.fees,
    queryFn: feesService.getFees,
  });
}

/** GET /api/fees/history */
export function useFeesHistory() {
  return useQuery({
    queryKey: [...QUERY_KEYS.fees, "history"],
    queryFn: feesService.getHistory,
  });
}

/** POST /api/fees/pay — invalidates fees cache + toast feedback */
export function usePayFees() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => feesService.payFees(payload),
    onSuccess: (data, variables) => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.fees });
      toast.success(data?.message || `Payment of ₹${variables?.amount} simulated`);
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}
