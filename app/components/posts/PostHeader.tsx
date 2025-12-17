import type { Post } from "@/app/lib/content/schema";
import InProgress from "@components/standard/InProgress";
import Image from "next/image";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const { title, description, date, updated, tags, hideDate, state, hero, repo, live, stack } = post;

  return (
    <header className="mb-8 border-b-2 border-border pb-6">
      <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">{title}</h1>
      <p className="text-lg mb-4 text-muted-foreground">{description}</p>

      {state === "in-progress" && (
              <div className="mb-8">
                <InProgress>
                  I'm still working on this post. Some parts might be incomplete or subject to change. Check back later for the finished article! 
                  </InProgress>
              </div>
            )}
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        {!hideDate && (
          <time dateTime={date} className="font-medium">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        
        {updated && (
          <span>
            Updated:{" "}
            <time dateTime={updated} className="font-medium">
              {new Date(updated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </span>
        )}
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border-2 border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-accent/40"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
            {hero && (
              <div className="mb-8 relative aspect-video overflow-hidden rounded-lg border-2 border-border bg-card shadow-lg">
                <Image
                  src={hero}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
      
            {(repo || live) && (
              <div className="mb-8 flex gap-4">
                {repo && (
                  <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Repository
                  </a>
                )}
                {live && (
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            )}
      
            {stack && stack.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide mb-2">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border-2 border-border bg-muted px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-accent/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
      
    </header>
  );
}
