"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/app/lib/content/schema";
import Link from "next/link";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

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

  return (
    <nav >
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
        In This Post
      </h2>
      <ul className="space-y-2 text-md text-foreground">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              marginLeft: `${(heading.level - 2) * 1}rem`,
            }}
          >
            <Link
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block transition-all duration-300 ease-out hover:text-foreground relative ${
                activeId === heading.id
                  ? "text-primary font-semibold pl-3 translate-x-1"
                  : "text-shadow-muted-foreground"
              }`}
            >
              <span
                className={`absolute left-0 top-0 bottom-0 w-0.5 bg-primary transition-all duration-300 ease-out ${
                  activeId === heading.id
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-50"
                }`}
              />
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

