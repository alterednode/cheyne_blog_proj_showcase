import type { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warn" | "success" | "error";
  children: ReactNode;
}

const styles = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warn: "bg-yellow-50 border-yellow-200 text-yellow-800",
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
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
