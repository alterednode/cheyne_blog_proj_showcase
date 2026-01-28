import { getPublishedPosts } from "@/app/lib/content/query";
import { PostCard } from "@/app/components/posts/PostCard";
import type { Metadata } from "next";
import { absoluteUrl, siteMeta, siteUrl } from "@/app/lib/site";

export const THIS_TITLE = "Posts by Onyx Cheyne";
export const THIS_DESCRIPTION =
  "Blog posts and project write-ups by Onyx Cheyne, a computer science student at UBC Okanagan.";

export const metadata: Metadata = {
  title: THIS_TITLE,
  description: THIS_DESCRIPTION,
  alternates: {
    canonical: "/posts",
  },
  openGraph: {
    type: "website",
    url: "/posts",
    title: THIS_TITLE,
    description: THIS_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: THIS_TITLE,
    description: THIS_DESCRIPTION,
  },
};

export default function PostsPage() {
  const posts = getPublishedPosts();
  const author = { "@type": "Person", name: siteMeta.name, url: siteUrl };
  const itemList = posts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(`/posts/${post.slug}`),
    name: post.title,
  }));
  const collectionJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: THIS_TITLE,
    url: absoluteUrl("/posts"),
    description: THIS_DESCRIPTION,
    about: author,
  };

  if (itemList.length > 0) {
    collectionJsonLd.mainEntity = {
      "@type": "ItemList",
      itemListElement: itemList,
    };
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <h1 className="text-3xl font-bold mb-2 bg-primary bg-clip-text text-transparent">
        {THIS_TITLE}
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Project write-ups and blog posts.
      </p>
      
      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
