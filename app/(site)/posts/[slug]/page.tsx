import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getPublishedPosts, getPostBySlug } from "@/app/lib/content/query";
import { PostHeader } from "@app/components/posts/PostHeader";
import { Prose } from "@components/posts/mdx/Prose";
import { mdxComponents } from "@/app/components/posts/mdx/MDXComponents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    ...(post.canonical && {
      alternates: {
        canonical: post.canonical,
      },
    }),
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { hero, repo, live, stack } = post;

  const { default: MdxContent } = await import(
    `@/content/posts/${post.sourceFile}`
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <PostHeader post={post} />

      {hero && (
        <div className="mb-8 relative aspect-video overflow-hidden rounded-lg border-2 border-primary/30 shadow-lg shadow-primary/10">
          <Image
            src={hero}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {(repo || live) && (
        <div className="mb-8 flex gap-4">
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-secondary to-accent px-4 py-2 text-sm font-medium text-secondary-foreground hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300"
            >
              Repository
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-medium text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              Live Demo
            </a>
          )}
        </div>
      )}

      {stack && stack.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 px-2 py-1 text-sm text-foreground font-medium hover:border-primary/60 hover:shadow-md hover:shadow-primary/20 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <Prose>
        <MdxContent components={mdxComponents} />
      </Prose>
    </main>
  );
}
