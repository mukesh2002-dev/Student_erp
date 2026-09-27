"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false, trickleSpeed: 120 });

/** Subtle top progress bar on route navigation (nprogress). */
export default function RouteProgress() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  useEffect(() => {
    const start = () => NProgress.start();
    const origPush = window.history.pushState;
    window.history.pushState = function (...args) {
      start();
      return origPush.apply(this, args);
    };
    window.addEventListener("beforeunload", start);
    return () => {
      window.history.pushState = origPush;
      window.removeEventListener("beforeunload", start);
    };
  }, []);

  return null;
}
