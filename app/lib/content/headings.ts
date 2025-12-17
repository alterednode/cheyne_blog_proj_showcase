import type { Heading } from "./schema";
import { createSlugger } from "./slug";

export function extractHeadings(content: string): Heading[] {
  // Match markdown headings: ## Title, ### Subtitle, etc.
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  const slugger = createSlugger();

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // Count the number of #
    const text = match[2].trim();

    const id = slugger(text);

    headings.push({ id, level, text });
  }

  return headings;
}
