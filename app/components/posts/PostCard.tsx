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
    <article className="group relative overflow-hidden border-t-2 border-border py-6 text-card-foreground transition-colors hover:border-primary">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-full w-0.5 origin-top scale-y-0 bg-primary opacity-0 transition delay-100 duration-110 ease-in group-hover:scale-y-100 group-hover:opacity-100 group-hover:delay-0"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-full w-0.5 origin-top scale-y-0 bg-primary opacity-0 transition delay-100 duration-110 ease-in group-hover:scale-y-100 group-hover:opacity-100 group-hover:delay-0"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-1/2 origin-left scale-x-0 bg-primary opacity-0 transition duration-110 ease-out group-hover:scale-x-100 group-hover:opacity-100 group-hover:delay-110"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-0.5 w-1/2 origin-right scale-x-0 bg-primary opacity-0 transition duration-110 ease-out group-hover:scale-x-100 group-hover:opacity-100 group-hover:delay-110"
      />
      <Link href={`/posts/${slug}`} className="block px-2">
        {showHeroImage && heroSrc ? (
          <div className="relative mb-5 aspect-[16/9] overflow-hidden ">
            <Image
              src={heroSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-semibold transition-colors group-hover:text-primary">
                {title}
              </h2>
              <time
                dateTime={date}
                className="text-sm font-medium text-muted-foreground md:pt-1 width-full ml-4 whitespace-nowrap"
              >
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            {subtitle ? (
              <p className="mt-1 text-sm font-medium text-muted-foreground">{subtitle}</p>
            ) : null}
            {/* <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground">{summary}</p> */}
          </div>
        </div>
      </Link>
    </article>
  );
}
