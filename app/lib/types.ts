// Unified frontmatter for all content types
export interface ContentFrontmatter {
  type: 'blog' | 'project';
  title: string;
  slug: string;
  publishedAt: string; // ISO date format (YYYY-MM-DD)
  description: string;
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
  coverImage?: string;
  // Blog-specific (optional)
  category?: string;
  // Project-specific (optional)
  demoUrl?: string;
  githubUrl?: string;
}

// Content item with full MDX data
export interface ContentItem {
  frontmatter: ContentFrontmatter;
  slug: string;
  content: string;
}

// Type guards for filtering
export function isBlogPost(item: ContentItem): boolean {
  return item.frontmatter.type === 'blog';
}

export function isProject(item: ContentItem): boolean {
  return item.frontmatter.type === 'project';
}

// Helper to check if content should be displayed (not draft)
export function isPublished(item: ContentItem): boolean {
  return item.frontmatter.draft !== true;
}
