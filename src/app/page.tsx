import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import type { PostMeta } from '@/types/content';

function loadContent(type: 'blog' | 'project'): PostMeta[] {
  const filePath = path.join(process.cwd(), 'public', 'generated-content-data', `${type}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as PostMeta[];
}

export default function HomePage() {
  const blog = loadContent('blog').slice(0, 2);
  const project = loadContent('project').slice(0, 2);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Intro */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold"><p>Hi, I&apos;m Onyx Cheyne</p>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          I&apos;m a developer and writer who shares thoughts and projects here on this site.
          From technical dives to creative builds, this is where I show my work.
        </p>
      </section>

      {/* Recent Posts and Projects Side by Side */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Blog Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
          <ul className="space-y-6">
            {blog.map((post) => (
              <li key={post.slug} className="border rounded-lg p-4 hover:shadow-md transition">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block text-xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>

                <p className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
          <ul className="space-y-6">
            {project.map((post) => (
              <li key={post.slug} className="border rounded-lg p-4 hover:shadow-md transition">
                <Link
                  href={`/project/${post.slug}`}
                  className="block text-xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>

                <p className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
