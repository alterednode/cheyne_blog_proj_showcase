import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostFrontmatterSchema, type Post } from "./schema";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function loadAllPosts(): Post[] {
  // Ensure the posts directory exists
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".mdx"));

  const posts: Post[] = files.map((filename) => {
    const filePath = path.join(POSTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data, content } = matter(fileContent);

    // Validate frontmatter with Zod
    const result = PostFrontmatterSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.issues
        .map((e) => `  - ${e.path.join(".")}: ${e.message}`)
        .join("\n");
      throw new Error(
        `Invalid frontmatter in ${filename}:\n${errors}`
      );
    }

    const frontmatter = result.data;

    // Derive slug from frontmatter or filename
    const slug = frontmatter.slug ?? filename.replace(/\.mdx$/, "");

    return {
      slug,
      rawMdx: content,
      ...frontmatter,
    };
  });

  // Sort by date DESC (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
