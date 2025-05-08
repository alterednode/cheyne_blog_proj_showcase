import InfinitePostList from '@/components/InfinitePostList';

export default function ProjectPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <InfinitePostList apiPath="/api/project" basePath="/project" />
    </main>
  );
}
