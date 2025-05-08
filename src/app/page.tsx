import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import type { PostMeta } from '@/types/content';
import ContentCard from '@/components/ContentCard';

function loadContent(type: 'blog' | 'project'): PostMeta[] {
  const filePath = path.join(process.cwd(), 'public', 'generated-content-data', `${type}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as PostMeta[];
}

export default function HomePage() {
  const blog = loadContent('blog').slice(0, 2);
  const project = loadContent('project').slice(0, 2);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">
      {/* Intro */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Hi, I&apos;m Onyx Cheyne
        </h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          I&apos;m a developer interested in how all the stuff that runs our internet works, and game design. Here you can find some of the things I&apos;ve made, and some posts about things that interest me.
        </p>
      </section>

      {/* Recent Posts and Projects Side by Side */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Blog Posts */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
            <Link
              href="/blog"
              className="text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
            >
              View all →
            </Link>
          </div>
          <ul className="space-y-6">
            {blog.map((post) => (
              <ContentCard key={post.slug} post={post} type="blog" />
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Recent Projects</h2>
            <Link
              href="/project"
              className="text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
            >
              View all →
            </Link>
          </div>
          <ul className="space-y-6">
            {project.map((post) => (
              <ContentCard key={post.slug} post={post} type="project" />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
