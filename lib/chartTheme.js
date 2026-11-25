export function getChartTheme(isDark) {
  return {
    axis: isDark ? "#8391a5" : "#6e7574",
    grid: isDark ? "#243044" : "#e3e5e0",
    tooltipBg: isDark ? "#111827" : "#ffffff",
    tooltipText: isDark ? "#f8fafc" : "#191c1d",
    tooltipBorder: isDark ? "#33415a" : "#cdd1cc",
    bar: isDark ? "#8cb6d9" : "#1f4e79",
    barSecondary: isDark ? "#33415a" : "#cdd1cc",
  };
}
