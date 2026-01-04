import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  const baseClassName =
    "rounded-2xl border-2 border-border/80 bg-card hover:bg-card text-card-foreground shadow-lg shadow-accent/5";

  return (
    <div className={[baseClassName, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
