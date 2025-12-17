"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { smoothScrollToHash } from "@/app/lib/ui/smoothScroll";

export type SmoothScrollLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

export function SmoothScrollLink({
  href,
  onClick,
  ...rest
}: SmoothScrollLinkProps) {
  const handleSmoothScrollAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (!href.startsWith("#")) return;

    e.preventDefault();
    smoothScrollToHash(href);
  };

  return <a href={href} onClick={handleSmoothScrollAnchorClick} {...rest} />;
}
