import type { Post } from "@/app/lib/content/schema";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const { title, description, date, updated, tags, hideDate } = post;

  return (
    <header className="mb-8 border-b-2 pb-6">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-lg mb-4">{description}</p>
      
      <div className="flex flex-wrap items-center gap-4 text-sm">
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
              className="rounded-full border-2 px-3 py-1 text-xs font-medium hover:shadow-md transition-all"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
