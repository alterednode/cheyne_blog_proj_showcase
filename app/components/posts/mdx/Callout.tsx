import type { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warn" | "success" | "error";
  children: ReactNode;
}

const styles = {
  info: "bg-secondary/10 border-secondary/30 text-secondary",
  warn: "bg-accent/10 border-accent/30 text-accent",
  success: "bg-primary/10 border-primary/30 text-primary",
  error: "bg-accent/10 border-accent/30 text-accent",
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
      className={`rounded-lg border p-4 ${styles[type]}`}
      role="alert"
    >
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}
