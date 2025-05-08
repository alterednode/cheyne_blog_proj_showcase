import Link from 'next/link';
import type { PostMeta } from '@/types/content';

interface ContentCardProps {
  post: PostMeta;
  type: 'blog' | 'project';
}

export default function ContentCard({ post, type }: ContentCardProps) {
  return (
    <li className="group max-w-3xl mx-auto">
      <Link
        href={`/${type}/${post.slug}`}
        className="block border border-[var(--card-border)] bg-[var(--card-background)] rounded-lg p-6 hover:shadow-lg transition-all duration-300"
      >
        <h3 className="text-xl font-semibold text-[var(--primary)] group-hover:text-[var(--primary-hover)] transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-[var(--muted)] mt-2">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        {post.description && (
          <p className="mt-3 text-[var(--foreground)] line-clamp-2">
            {post.description}
          </p>
        )}
      </Link>
    </li>
  );
} 