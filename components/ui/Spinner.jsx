import { cn } from "@/lib/utils";

const sizes = { sm: "w-4 h-4 border-2", md: "w-6 h-6 border-2", lg: "w-10 h-10 border-[3px]" };

/** Animated loading spinner. */
export function Spinner({ size = "md", className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("inline-block rounded-full border-indigo-600 border-t-transparent animate-spin", sizes[size], className)}
    />
  );
}
