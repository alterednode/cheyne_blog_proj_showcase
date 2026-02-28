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

    // Preserve normal browser behavior for modified clicks (new tab/window, etc.)
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "_self") return;

    if (typeof window === "undefined") return;

    // Smooth-scroll only for same-page hashes (e.g. "#section" or "/current#section")
    const url = new URL(href, window.location.href);
    const isSamePage =
      url.origin === window.location.origin &&
      url.pathname === window.location.pathname &&
      url.search === window.location.search;

    if (!isSamePage || !url.hash) return;

    e.preventDefault();
    smoothScrollToHash(url.hash);
  };

  return <a href={href} onClick={handleSmoothScrollAnchorClick} {...rest} />;
}
