"use client";
import { useState } from "react";
import Sidebar, { SidebarPanel } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { BottomNav, MobileSidebar } from "@/components/MobileNav";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

export default function StudentLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <Sidebar />
      <MobileSidebar open={open} onClose={() => setOpen(false)}>
        <SidebarPanel onNavigate={() => setOpen(false)} />
      </MobileSidebar>
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onMenu={() => setOpen(true)} />
        <main className="flex-1 overflow-x-hidden px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-8">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
