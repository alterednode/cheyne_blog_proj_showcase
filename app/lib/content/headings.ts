import type { Heading } from "./schema";

export function extractHeadings(content: string): Heading[] {
  // Match markdown headings: ## Title, ### Subtitle, etc.
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  const idCounts = new Map<string, number>();

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // Count the number of #
    const text = match[2].trim();

    // Generate a slug-like ID from the text
    let id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim();

    // Handle duplicate IDs by appending a counter
    const count = (idCounts.get(id) || 0) + 1;
    idCounts.set(id, count);
    
    if (count > 1) {
      id = `${id}-${count}`;
    }

    headings.push({ id, level, text });
  }

  return headings;
}
