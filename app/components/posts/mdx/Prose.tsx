import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
}

export function Prose({ children }: ProseProps) {
  return (
    <div className="max-w-[72ch] mx-auto space-y-6 leading-relaxed text-foreground">
      {/* Anchor for TOC introduction link
      Add here to have a scroll target for the introduction link in the TOC
      */}
      <div id="first-toc-introduction-element" className="invisible absolute -mt-8" aria-hidden="true" />
      {children}
    </div>
  );
}
