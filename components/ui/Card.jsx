import { cn } from "@/lib/utils";

/** Card container with header/body/footer slots. */
export function Card({ className, children }) {
  return (
    <div className={cn("rounded-xl border border-hairline bg-surface", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return <div className={cn("border-b border-hairline px-5 py-4", className)}>{children}</div>;
}

export function CardBody({ className, children }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
  return <div className={cn("border-t border-hairline px-5 py-4", className)}>{children}</div>;
}
