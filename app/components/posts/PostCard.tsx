import Link from "next/link";
import type { Post } from "@/app/lib/content/schema";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, title, description, date } = post;

  return (
    <article className="rounded-lg border-2 p-6 shadow-lg">
      <Link href={`/posts/${slug}`} className="block">
        <h2 className="text-xl font-semibold mb-2">
          {title}
        </h2>
        <p className="mb-4 line-clamp-2">{description}</p>
        <time
          dateTime={date}
          className="text-sm font-medium"
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
