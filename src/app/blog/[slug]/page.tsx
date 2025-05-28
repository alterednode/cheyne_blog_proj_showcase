import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import Iframe from '@/components/Iframe';

type Params = { slug: string };

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);

  let mdx = '';
  try {
    mdx = await fs.readFile(filePath, 'utf-8');
  } catch {
    throw new Error(`Post not found: ${slug}`);
  }



  const { content, frontmatter } = await compileMDX<{
    title: string;
    date: string;
  }>({
    source: mdx,
    options: { parseFrontmatter: true },
    components: {
      Iframe,
    },
  });

  return (
    <div className="w-full flex justify-center px-4 sm:px-6">
      <article className="prose prose-2xl dark:prose-invert max-w-3xl w-full py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {new Date(frontmatter.date).toLocaleDateString()}
          </p>
        </header>
        {content}
      </article>
    </div>
  );
}
