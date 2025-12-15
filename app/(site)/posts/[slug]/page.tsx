import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getPublishedPosts, getPostBySlug } from "@/app/lib/content/query";
import { PostHeader } from "@app/components/posts/PostHeader";
import { Prose } from "@components/posts/mdx/Prose";
import { mdxComponents } from "@/app/components/posts/mdx/MDXComponents";
import InProgress from "@/app/components/posts/mdx/InProgress";

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

  const { hero, repo, live, stack, state } = post;

  const { default: MdxContent } = await import(
    `@/content/posts/${post.sourceFile}`
  );

  return (
    
    <div className="max-w-4xl mx-auto px-4 py-8 text-foreground">
      {state === "in-progress" && (
        <div className="mb-8">
          <InProgress />
        </div>
      )}
      <PostHeader post={post} />

      {hero && (
        <div className="mb-8 relative aspect-video overflow-hidden rounded-lg border-2 border-border bg-card shadow-lg">
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
              className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Repository
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Live Demo
            </a>
          )}
        </div>
      )}

      {stack && stack.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-2">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded border-2 border-border bg-muted px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-accent/40"
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
    </div>
  );
}
