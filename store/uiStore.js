"use client";
import { create } from "zustand";

/** Global UI state — sidebar, modals, confirm dialogs. */
export const useUiStore = create((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  confirm: null, // { title, message, onConfirm }
  askConfirm: (confirm) => set({ confirm }),
  clearConfirm: () => set({ confirm: null }),
}));
