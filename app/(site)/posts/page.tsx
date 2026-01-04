import { getPublishedPosts } from "@/app/lib/content/query";
import { PostCard } from "@/app/components/posts/PostCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "All published posts",
};

export default function PostsPage() {
  const posts = getPublishedPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-foreground">
      <h1 className="text-3xl font-bold mb-8 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Posts</h1>
      
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
