import { z } from "zod";

// Helper to coerce Date objects to ISO strings (gray-matter parses YAML dates as Date objects)
const dateString = z.preprocess(
  (val) => (val instanceof Date ? val.toISOString() : val),
  z.string()
);

export const PostFrontmatterSchema = z.object({
  // Required fields
  title: z.string(),
  description: z.string(),
  date: dateString, // ISO date string

  // Optional fields
  status: z.enum(["draft", "published"]).default("published"),
  tags: z.array(z.string()).optional(),
  updated: dateString.optional(),
  hero: z.string().optional(),
  repo: z.string().optional(),
  live: z.string().optional(),
  stack: z.array(z.string()).optional(),
  toc: z.boolean().optional(),
  hideDate: z.boolean().optional(),
  canonical: z.string().optional(),
  series: z.string().optional(),
  slug: z.string().optional(),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;

export type Post = {
  slug: string;
  rawMdx: string;
} & PostFrontmatter;
