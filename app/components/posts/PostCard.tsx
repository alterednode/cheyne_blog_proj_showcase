import Link from "next/link";
import type { Post } from "@/app/lib/content/schema";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, title, description, date } = post;

  return (
    <article className="rounded-lg border-2 border-secondary/30 bg-gradient-to-br from-card via-secondary/5 to-card p-6 shadow-lg shadow-secondary/10 hover:border-secondary/60 hover:shadow-secondary/20 transition-all duration-300">
      <Link href={`/posts/${slug}`} className="block">
        <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-300">
          {title}
        </h2>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <time
          dateTime={date}
          className="text-sm text-accent font-medium"
        >
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </Link>
    </article>
  );
}
