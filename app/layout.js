import "./globals.css";
import "nprogress/nprogress.css";
import AppProviders from "@/providers/AppProviders";

export const metadata = {
  title: "Student ERP — Student Academic Portal",
  description: "Modern student ERP for managing classes, homework, attendance, study materials, exams, practice tests, results and academic progress.",
};

const themeScript = `(function(){try{var k='student-erp-theme';var t=localStorage.getItem(k);if(!t){var legacy=localStorage.getItem('theme');if(legacy) t=legacy;}if(!t) t='light';var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(m?'dark':'light'):t;if(r==='dark') document.documentElement.classList.add('dark');document.documentElement.style.colorScheme=r;}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline blocking script — must run before paint to prevent theme flash */}
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased overflow-x-hidden" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
