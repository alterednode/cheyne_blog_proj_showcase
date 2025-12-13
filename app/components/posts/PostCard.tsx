import Link from "next/link";
import type { Post } from "@/app/lib/content/schema";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, title, description, date } = post;

  return (
    <article className="rounded-lg border border-border bg-secondary text-card-foreground p-6 transition-shadow hover:border-ring/60 hover:shadow-md">
      <Link href={`/posts/${slug}`} className="block">
        <h2 className="text-xl font-semibold mb-2 transition-colors hover:text-accent">
          {title}
        </h2>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <time
          dateTime={date}
          className="text-sm text-muted-foreground"
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
