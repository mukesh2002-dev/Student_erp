import api from "./api";

/** Dashboard service — aggregated home-screen data. */
export const dashboardService = {
  getDashboard: () => api.get("/dashboard"),
};
