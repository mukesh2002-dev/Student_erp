"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", setTheme: () => {}, resolvedTheme: "light" });

export function useTheme() {
  return useContext(ThemeContext);
}

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem("student-erp-theme");
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
    const legacy = localStorage.getItem("theme");
    if (legacy === "light" || legacy === "dark") return legacy;
    // also check studentSettings darkMode for migration
    const s = localStorage.getItem("studentSettings");
    if (s) {
      const parsed = JSON.parse(s);
      if (typeof parsed.darkMode === "boolean") return parsed.darkMode ? "dark" : "light";
    }
  } catch {}
  return "light";
}

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const t = getInitialTheme();
    if (t === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return t;
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (currentTheme) => {
      const resolved = currentTheme === "system" ? (media.matches ? "dark" : "light") : currentTheme;
      setResolvedTheme(resolved);
      document.documentElement.classList.toggle("dark", resolved === "dark");
      document.documentElement.style.colorScheme = resolved;
      try {
        localStorage.setItem("student-erp-theme", currentTheme);
        localStorage.setItem("theme", resolved);
      } catch {}
    };

    apply(theme);

    if (theme === "system") {
      const handler = () => apply(theme);
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, [theme]);

  const setTheme = (t) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
