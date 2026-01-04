import type { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warn" | "success" | "error";
  children: ReactNode;
}

const styles: Record<NonNullable<CalloutProps["type"]>, { container: string; icon: string }> = {
  info: { container: "bg-secondary/10 border-secondary/30 text-foreground", icon: "text-secondary" },
  warn: { container: "bg-accent/10 border-accent/30 text-foreground", icon: "text-accent" },
  success: { container: "bg-primary/10 border-primary/30 text-foreground", icon: "text-primary" },
  error: { container: "bg-accent/10 border-accent/30 text-foreground", icon: "text-accent" },
};

//TODO: improve the look of this component
const icons = {
  info: "ℹ️",
  warn: "⚠️",
  success: "✅",
  error: "❌",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${styles[type].container}`}
      role="alert"
    >
      <span className={`mr-2 ${styles[type].icon}`}>{icons[type]}</span>
      {children}
    </div>
  );
}
