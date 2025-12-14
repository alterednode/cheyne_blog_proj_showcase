import Link from "next/link";
import type { Post } from "@/app/lib/content/schema";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, title, description, date } = post;

  return (
    <article className="group rounded-lg border-2 border-border/80 bg-gradient-to-br from-card via-card to-muted p-6 text-card-foreground shadow-lg shadow-accent/5 transition-colors hover:border-primary/50 hover:shadow-primary/10">
      <Link href={`/posts/${slug}`} className="block">
        <h2 className="text-xl font-semibold mb-2 transition-colors group-hover:text-primary">
          {title}
        </h2>
        <p className="mb-4 line-clamp-2 text-muted-foreground">{description}</p>
        <time
          dateTime={date}
          className="text-sm font-medium text-muted-foreground"
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
