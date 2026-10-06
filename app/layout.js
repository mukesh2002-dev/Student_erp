import "./globals.css";
import "nprogress/nprogress.css";
import AppProviders from "@/providers/AppProviders";

export const metadata = {
  title: "Student ERP — Student Academic Portal",
  description: "Modern student ERP for managing classes, homework, attendance, study materials, exams, practice tests, results and academic progress.",
};

// Extracted to module scope — never inline in JSX (avoids re-creation on render)
const themeScript = `(function(){try{var k='student-erp-theme';var t=localStorage.getItem(k);if(!t){var legacy=localStorage.getItem('theme');if(legacy) t=legacy;}if(!t) t='light';var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(m?'dark':'light'):t;if(r==='dark') document.documentElement.classList.add('dark');document.documentElement.style.colorScheme=r;}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Plain inline script — runs synchronously before paint to prevent theme flash.
            Do NOT use next/script here; it causes "script outside main document" errors
            in Next.js 16 App Router. See AGENTS.md. */}
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning className="min-h-screen antialiased overflow-x-hidden" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
