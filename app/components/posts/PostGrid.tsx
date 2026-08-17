import type { Post } from "@/app/lib/content/schema";
import { PostCard } from "@components/posts/PostCard";

export interface PostGridProps {
  title?: string;
  posts: Post[];
  emptyMessage?: string;
  showHeroImage?: boolean;
  className?: string;
}

export function PostGrid({
  title,
  posts,
  emptyMessage = "No posts yet.",
  showHeroImage,
  className,
}: PostGridProps) {
  return (
    <div className={className}>
      {title ? (
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.slug} post={post} showHeroImage={showHeroImage} />
          ))
        )}
      </div>
    </div>
  );
}
