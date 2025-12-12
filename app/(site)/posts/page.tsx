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
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
