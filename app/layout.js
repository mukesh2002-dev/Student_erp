import "./globals.css";
import "nprogress/nprogress.css";
import Script from "next/script";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import AppProviders from "@/providers/AppProviders";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  title: "Student ERP — Student Academic Portal",
  description: "Modern student ERP for managing classes, homework, attendance, study materials, exams, practice tests, results and academic progress.",
};

// Extracted to module scope — never inline in JSX (avoids re-creation on render)
const themeScript = `(function(){try{var k='student-erp-theme';var t=localStorage.getItem(k);if(!t){var legacy=localStorage.getItem('theme');if(legacy) t=legacy;}if(!t) t='light';var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(m?'dark':'light'):t;if(r==='dark') document.documentElement.classList.add('dark');document.documentElement.style.colorScheme=r;}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plexSans.variable} ${plexMono.variable}`}>
      <head>
        {/* Runs before hydration so the stored theme is on <html> before first paint.
            Must be next/script (not a raw <script>) — see AGENTS.md. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body suppressHydrationWarning className="min-h-screen overflow-x-hidden bg-canvas text-ink antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
