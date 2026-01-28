import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getPublishedPosts, getPostBySlug } from "@/app/lib/content/query";
import { absoluteUrl, siteMeta, siteUrl } from "@/app/lib/site";
import { PostHeader } from "@app/components/posts/PostHeader";
import { TableOfContents } from "@app/components/posts/TableOfContents";
import { Prose } from "@components/posts/mdx/Prose";
import { mdxComponents } from "@/app/components/posts/mdx/MDXComponents";
import InProgress from "@/app/components/standard/InProgress";
import Link from "next/link";

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

  const description = post.description ?? post.summary;
  const ogImage = resolveImageUrl(post.hero);
  const postUrl = absoluteUrl(`/posts/${post.slug}`);
  const canonicalUrl = post.canonical ?? postUrl;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [siteUrl],
      tags: post.tags,
      images: ogImage ? [{ url: ogImage, alt: post.title }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    authors: [{ name: siteMeta.name, url: siteUrl }],
  };
}

function resolveImageUrl(value?: string) {
  if (!value) return absoluteUrl("/c-wrench/full no bkg.png");
  if (/^https?:\/\//.test(value)) return value;
  return absoluteUrl(value);
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { state } = post;

  const { default: MdxContent } = await import(
    `@/content/posts/${post.sourceFile}`
  );

  // Prepare TOC items with introduction
  const tocItems = post.headings && post.headings.length > 0
    ? [
        { 
          id: "first-toc-introduction-element", 
          level: 2, 
          text: post.tocIntroHeader || "Introduction" 
        },
        ...post.headings,
      ]
    : undefined;

  return (
    <div>
      {
        state === "in-progress" ? (
          <InProgress>
            I'm still working on this post. Some parts might be incomplete or subject to
            change. Check back later for the finished article!
          </InProgress>
        ) : null}
      <div className="mx-auto px-4 py-8 text-foreground">
        <div className="max-w-4xl mx-auto">
          <PostHeader post={post} />
        </div>
        <div className={`grid gap-8 mt-8 ${tocItems ? "grid-cols-1 lg:grid-cols-[1fr_280px] max-w-6xl" : "max-w-4xl"} mx-auto`}>
          <div className="min-w-0">
            <Prose>
              <MdxContent components={mdxComponents} />
            </Prose>
          </div>
          {post.displayToc && tocItems && (
            <aside className="hidden lg:block">
              <div className="sticky top-8">
                <TableOfContents headings={tocItems} />
              </div>
            </aside>
          )}
        </div>
      </div>
      <div className="text-center text-sm text-muted-foreground">Licensed under <Link href="https://github.com/alterednode/cheyne_blog_proj_showcase/blob/main/CONTENT_LICENSE.md">CC BY-NC 4.0.</Link></div>
    </div>
  );
}
