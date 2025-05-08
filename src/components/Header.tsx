'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-gray-200 bg-white p-4">
      <nav className="mx-auto max-w-5xl flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          cheyne.dev
        </Link>
        <div className="space-x-4">
          <Link
            href="/blog"
            className={pathname.startsWith('/blog') ? 'font-semibold underline' : ''}
          >
            Blog
          </Link>
          <Link
            href="/project"
            className={pathname.startsWith('/project') ? 'font-semibold underline' : ''}
          >
            Projects
          </Link>
        </div>
      </nav>
    </header>
  );
}
