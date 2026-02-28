import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
}

export function Prose({ children }: ProseProps) {
  return (
    //TODO: find a better way to handle tailwind stripping the remark-gfm styling
    <div className="max-w-[72ch] mx-auto space-y-6 leading-relaxed text-foreground [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_ul.contains-task-list]:list-none [&_ul.contains-task-list]:pl-0 [&_li.task-list-item]:list-none [&_li.task-list-item]:pl-0 [&_li.task-list-item>input]:mr-2">
      {/* Anchor for TOC introduction link
      Add here to have a scroll target for the introduction link in the TOC
      */}
      <div id="first-toc-introduction-element" className="invisible absolute -mt-8" aria-hidden="true" />
      {children}
    </div>
  );
}
