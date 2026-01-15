import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/app/lib/content/schema";

interface PostCardProps {
  post: Post;
  showHeroImage?: boolean;
}

export function PostCard({ post, showHeroImage = false }: PostCardProps) {
  const { slug, title, description, date } = post;
  const heroSrc = post.hero;

  return (
    <article className="group overflow-hidden rounded-lg border-2 border-border/80 bg-linear-to-br from-background via-card to-muted p-6 text-card-foreground shadow-lg shadow-accent/5 transition-colors hover:border-primary hover:shadow-primary/30 ">
      <Link href={`/posts/${slug}`} className="block">
        {showHeroImage && heroSrc ? (
          <div className="relative -mx-4 -mt-4 mb-4 aspect-video w-[calc(100%+2rem)] overflow-hidden border-b-2 border-border/60 rounded-sm bg-muted">
            <Image
              src={heroSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ) : null}
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
