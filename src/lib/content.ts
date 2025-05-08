import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Frontmatter, PostMeta } from '@/types/content';

export function getAllContent(type: 'blog' | 'project'): PostMeta[] {
  const dir = path.join(process.cwd(), 'content', type);
  const files = fs.readdirSync(dir);

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const fullPath = path.join(dir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(fileContents);

    const frontmatter = data as Frontmatter;

    return {
      ...frontmatter,
      slug,
    };
  }).sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
