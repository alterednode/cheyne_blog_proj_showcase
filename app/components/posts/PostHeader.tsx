import type { Post } from "@/app/lib/content/schema";
import Image from "next/image";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const { title, description, date, updated, tags, hideDate, state, hero, repo, live, stack } =
    post;

  const formattedDate = hideDate ? null : formatDate(date);
  const formattedUpdated = updated ? formatDate(updated) : null;
  const updatedDateTime = updated ?? null;

  return (
    <header className="mb-10">

        <div className="relative">
          <h1 className="text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-prose text-base text-muted-foreground md:text-lg">
            {description}
          </p>
          {(formattedDate || formattedUpdated) && (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {formattedDate ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1">
                  <span className="text-xs font-semibold uppercase tracking-wide">Published</span>
                  <time dateTime={date} className="font-medium text-foreground">
                    {formattedDate}
                  </time>
                </span>
              ) : null}
              {formattedUpdated && updatedDateTime ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1">
                  <span className="text-xs font-semibold uppercase tracking-wide">Updated</span>
                  <time dateTime={updatedDateTime} className="font-medium text-foreground">
                    {formattedUpdated}
                  </time>
                </span>
              ) : null}
            </div>
          )}



          {(tags && tags.length > 0) || (stack && stack.length > 0) ? (
            <div className="mt-6 space-y-3">
              {tags && tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-accent/35 hover:bg-muted hover:text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              {stack && stack.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/35 hover:bg-muted hover:text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {repo || live ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {repo ? (
                <a
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <LinkIcon />
                  Repository
                </a>
              ) : null}
              {live ? (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-accent/35 bg-accent/10 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ExternalIcon />
                  Live demo
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

      {hero ? (
        <div className="mt-6">
          <div className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <Image
              src={hero}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent" />
          </div>
        </div>
      ) : null}
    </header>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function LinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 12" />
      <path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 0 1-7-7L7 12" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" />
    </svg>
  );
}
