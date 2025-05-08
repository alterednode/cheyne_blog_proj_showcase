import InfinitePostList from '@/components/InfinitePostList';

export default function BlogPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">Blog Posts</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          Blog posts. More to come.
        </p>
      </section>

      <InfinitePostList apiPath="/api/blog/" basePath="/blog" />
    </main>
  );
}
