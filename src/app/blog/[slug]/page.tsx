import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';

type Params = {
  slug: string;
};

export default async function BlogPostPage({ params }: { params: Params }) {
  const filePath = path.join(process.cwd(), 'content', 'blog', `${params.slug}.mdx`);

  let mdx = '';
  try {
    mdx = await fs.readFile(filePath, 'utf-8');
  } catch {
    throw new Error(`Post not found: ${params.slug}`);
  }

  const { content, frontmatter } = await compileMDX<{
    title: string;
    date: string;
  }>({
    source: mdx,
    options: { parseFrontmatter: true },
  });

  return (
    <article className="prose mx-auto p-6">
      <h1>{frontmatter.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(frontmatter.date).toLocaleDateString()}
      </p>
      {content}
    </article>
  );
}
