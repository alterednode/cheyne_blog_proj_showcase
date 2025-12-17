"use client";

import { useEffect, useState, useRef } from "react";
import type { Heading } from "@/app/lib/content/schema";
import Link from "next/link";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLUListElement | null>(null);
  const [indicator, setIndicator] = useState<{
    top: number;
    height: number;
    visible: boolean;
  }>({ top: 0, height: 0, visible: false });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL hash without triggering a scroll
      window.history.pushState(null, "", `#${id}`);
    }
  };

  useEffect(() => {
    const updateActiveId = () => {
      const headingElements = headings
        .map((heading) => ({
          id: heading.id,
          element: document.getElementById(heading.id),
        }))
        .filter((h) => h.element !== null);

      if (headingElements.length === 0) return;

      const windowHeight = window.innerHeight;
      const midpoint = windowHeight / 2;
      
      // Find the heading whose midpoint has most recently crossed the viewport midpoint
      // (heading midpoint is above the viewport midpoint)
      let nextActiveId = headingElements[0]?.id || "";
      let closestDistance = Infinity;
      
      for (const { id, element } of headingElements) {
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        const headingMidpoint = rect.top + rect.height / 2;
        
        // Only consider headings that have passed the viewport midpoint
        if (headingMidpoint <= midpoint) {
          const distance = midpoint - headingMidpoint;
          if (distance < closestDistance) {
            closestDistance = distance;
            nextActiveId = id;
          }
        }
      }
      
      setActiveId(nextActiveId);
    };

    // Update on scroll
    window.addEventListener("scroll", updateActiveId, { passive: true });
    // Initial update
    updateActiveId();

    return () => window.removeEventListener("scroll", updateActiveId);
  }, [headings]);

  // Position the single indicator to the active TOC link
  useEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current;
      if (!nav || !activeId) {
        setIndicator((s) => ({ ...s, visible: false }));
        return;
      }

      const link = nav.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
      if (!link) {
        setIndicator((s) => ({ ...s, visible: false }));
        return;
      }

      const navRect = nav.getBoundingClientRect();
      const rect = link.getBoundingClientRect();
      setIndicator({ top: rect.top - navRect.top, height: rect.height, visible: true });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeId, headings]);

  return (
    <nav className="relative pl-4">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
        In This Post
      </h2>
      <ul ref={navRef} className="space-y-2 text-md text-foreground relative">
        {/* single sliding indicator */}
        <span
          aria-hidden
          style={{
            top: indicator.visible ? `${indicator.top}px` : undefined,
            height: indicator.visible ? `${indicator.height}px` : undefined,
            transform: "translateX(-0.5rem)",
          }}
          className={`pointer-events-none absolute left-0 w-0.5 bg-primary transition-all duration-300 ease-out ${
            indicator.visible ? "opacity-100" : "opacity-0"
          }`}
        />

        {headings.map((heading) => (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block transition-colors duration-200 ease-out hover:text-foreground relative ${
                activeId === heading.id
                  ? "text-primary font-semibold"
                  : "text-shadow-muted-foreground"
              }`}
            >
              <span style={{ display: "inline-block", marginLeft: `${(heading.level - 2) * 1}rem` }}>
                {heading.text}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

