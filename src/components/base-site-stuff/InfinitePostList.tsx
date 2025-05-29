'use client';

import { useEffect, useRef, useState } from 'react';
import { PostMeta } from '@/types/content';
import ContentCard from './ContentCard';

type Props = {
  apiPath: string;
  basePath: string;
};

export default function InfinitePostList({ apiPath, basePath }: Props) {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const perPage = 5;

  useEffect(() => {
    const load = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      const res = await fetch(`${apiPath}/?page=${page}&perPage=${perPage}`);
      const json = await res.json();

      setPosts((prev) => {
        const newPosts = json.data.filter(
          (newPost: PostMeta) => !prev.some((p) => p.slug === newPost.slug)
        );
        return [...prev, ...newPosts];
      });

      if (json.data.length < perPage) setHasMore(false);
      setLoading(false);
    };

    load();
  }, [page, hasMore, loading, apiPath]);

  useEffect(() => {
    if (!hasMore || loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((p) => p + 1);
      }
    });

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, loading]);

  const type = basePath.slice(1) as 'blog' | 'project';

  return (
    <div className="space-y-8">
      <ul className="space-y-6">
        {posts.map((post) => (
          <ContentCard key={post.slug} post={post} type={type} />
        ))}
      </ul>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]" />
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <p className="text-center text-[var(--muted)] py-8">No more posts to load.</p>
      )}

      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
