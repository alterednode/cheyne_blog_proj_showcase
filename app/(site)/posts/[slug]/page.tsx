import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getPublishedPosts, getPostBySlug } from "@/app/lib/content/query";
import { PostHeader } from "@app/components/posts/PostHeader";
import { Prose } from "@components/posts/mdx/Prose";
import { mdxComponents } from "@/app/components/posts/mdx/MDXComponents";
import InProgress from "@/app/components/standard/InProgress";

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
      <PostHeader post={post} />
      <Prose>
        <MdxContent components={mdxComponents} />
      </Prose>
    </div>
  );
}
