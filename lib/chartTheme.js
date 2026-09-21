export function getChartTheme(isDark) {
  return {
    axis: isDark ? "#94A3B8" : "#64748b",
    grid: isDark ? "#243044" : "#e2e8f0",
    tooltipBg: isDark ? "#111827" : "#ffffff",
    tooltipText: isDark ? "#F8FAFC" : "#0f172a",
    tooltipBorder: isDark ? "#243044" : "#e2e8f0",
    bar: "#6366f1",
    barSecondary: "#94A3B8",
  };
}
