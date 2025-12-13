import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
}

export function Prose({ children }: ProseProps) {
  return (
    <div className="max-w-[72ch] mx-auto space-y-6 leading-relaxed">
      {children}
    </div>
  );
}
