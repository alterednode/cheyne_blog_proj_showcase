import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/app/lib/content/schema";

interface PostCardProps {
  post: Post;
  showHeroImage?: boolean;
}

export function PostCard({ post, showHeroImage = false }: PostCardProps) {
  const { slug, title, subtitle, summary, date } = post;
  const heroSrc = post.hero;

  return (
    <article className="group overflow-hidden rounded-lg border-2 border-border/80 bg-card p-6 text-card-foreground shadow-lg shadow-accent/5 transition-colors hover:border-primary hover:shadow-primary/30 ">
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
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold transition-colors group-hover:text-primary">
            {title}
          </h2>

          <time
            dateTime={date}
            className="whitespace-nowrap text-sm font-medium text-muted-foreground"
          >
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        {subtitle ? (
          <h3 className="mt-2 text-sm font-medium text-muted-foreground">{subtitle}</h3>
        ) : null}
        <p className="mt-3 line-clamp-2 text-sm text-foreground">{summary}</p>
      </Link>
    </article>
  );
}
