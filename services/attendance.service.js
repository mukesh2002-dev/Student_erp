import api from "./api";

/** Attendance service — all attendance HTTP calls live here. */
export const attendanceService = {
  getSummary: (params) => api.get("/attendance", { params }),
  markLeave: (payload) => api.post("/attendance/leave", payload),
};
