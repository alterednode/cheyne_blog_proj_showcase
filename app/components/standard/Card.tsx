import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  const baseClassName =
    "border-t-2 border-border bg-transparent text-card-foreground";

  return (
    <div className={[baseClassName, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
