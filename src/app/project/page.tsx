import InfinitePostList from '@/components/InfinitePostList';

export default function ProjectPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">Projects</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          Projects. More to come.
        </p>
      </section>

      <InfinitePostList apiPath="/api/project" basePath="/project" />
    </main>
  );
}
