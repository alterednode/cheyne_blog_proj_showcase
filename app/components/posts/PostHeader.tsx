import type { Post } from "@/app/lib/content/schema";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const { title, description, date, updated, tags, hideDate } = post;

  return (
    <header className="mb-8 border-b-2 border-primary/30 pb-6">
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">{title}</h1>
      <p className="text-muted-foreground text-lg mb-4">{description}</p>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        {!hideDate && (
          <time dateTime={date} className="text-accent font-medium">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        
        {updated && (
          <span className="text-muted-foreground">
            Updated:{" "}
            <time dateTime={updated} className="text-secondary font-medium">
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
              className="rounded-full border-2 border-secondary/35 bg-gradient-to-r from-secondary/10 to-accent/10 px-3 py-1 text-xs font-medium text-foreground hover:border-secondary/60 hover:shadow-md hover:shadow-secondary/20 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
