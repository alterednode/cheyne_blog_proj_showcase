import Link from "next/link";
import type { Post } from "@/app/lib/content/schema";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, title, description, date } = post;

  return (
    <article className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <Link href={`/posts/${slug}`} className="block">
        <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
          {title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <time
          dateTime={date}
          className="text-sm text-gray-500"
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
