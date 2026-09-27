/** App-wide constants — single source of truth. */

export const APP_NAME = "Student ERP";
export const STUDENT_CLASS = "10-A";
export const ACADEMIC_SESSION = "2026-27";

export const QUERY_KEYS = {
  dashboard: ["dashboard"],
  fees: ["fees"],
  attendance: (params) => ["attendance", params || {}],
  student: ["student"],
  timetable: ["timetable"],
  results: ["results"],
  notices: ["notices"],
};

export const ROUTES = {
  home: "/student",
  login: "/login",
  fees: "/student/fees",
  attendance: "/student/attendance",
  results: "/student/results",
};

export const TOKEN_KEY = "student-erp-token";
export const THEME_KEY = "student-erp-theme";

export const FEE_STATUS = {
  PAID: "Paid",
  PARTIAL: "Partial",
  PENDING: "Pending",
};
