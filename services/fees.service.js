import api from "./api";

/** Fees service — all fees HTTP calls live here. */
export const feesService = {
  getFees: () => api.get("/fees"),
  payFees: (payload) => api.post("/fees/pay", payload),
  getHistory: () => api.get("/fees/history"),
};
