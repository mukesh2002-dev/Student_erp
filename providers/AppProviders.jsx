"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster, toast } from "react-hot-toast";
import ThemeProvider from "@/components/ThemeProvider";
import RouteProgress from "@/components/shared/RouteProgress";
import { getErrorMessage } from "@/lib/errors";

/**
 * App-level providers: Theme + TanStack Query + Toasts + Route progress.
 * Wrap app/layout.js with this. One QueryClient per browser session.
 */
export default function AppProviders({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 min
            gcTime: 1000 * 60 * 10, // 10 min
            retry: 2,
            refetchOnWindowFocus: false,
          },
          mutations: {
            onError: (err) => toast.error(getErrorMessage(err)),
          },
        },
      })
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouteProgress />
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
