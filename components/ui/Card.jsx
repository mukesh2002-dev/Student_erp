import { cn } from "@/lib/utils";

/** Card container with header/body/footer slots. */
export function Card({ className, children }) {
  return (
    <div className={cn("rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044]", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return <div className={cn("p-5 border-b border-slate-200 dark:border-[#243044]", className)}>{children}</div>;
}

export function CardBody({ className, children }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
  return <div className={cn("p-5 border-t border-slate-100 dark:border-[#243044]", className)}>{children}</div>;
}
