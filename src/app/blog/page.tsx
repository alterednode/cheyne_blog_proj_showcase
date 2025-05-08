import InfinitePostList from '@/components/InfinitePostList';

export default function BlogPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Blog Posts</h1>
      <InfinitePostList apiPath="/api/blog/" basePath="/blog" />
    </main>
  );
}
