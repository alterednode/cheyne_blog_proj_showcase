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
    <main className="p-6 space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-2">Latest Blog Posts</h2>
        <ul>
          {blog.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 underline">
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">Recent Projects</h2>
        <ul>
          {project.map((post) => (
            <li key={post.slug}>
              <Link href={`/project/${post.slug}`} className="text-blue-600 underline">
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
