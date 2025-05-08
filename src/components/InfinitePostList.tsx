'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PostMeta } from '@/types/content';

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
      setLoading(true);
      const url = `${apiPath}/?page=${page}&perPage=${perPage}`;
      const res = await fetch(url);
      const json = await res.json();

      setPosts((prev) => [...prev, ...json.data]);
      if (json.data.length < perPage) setHasMore(false);
      setLoading(false);
    };

    load();
  }, [page, apiPath]);

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

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`${basePath}/${post.slug}`} className="text-xl font-semibold text-blue-700 underline">
            {post.title}
          </Link>
          <p className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
        </div>
      ))}

      {loading && <p>Loading...</p>}
      {!hasMore && <p className="text-gray-400">No more posts.</p>}

      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
