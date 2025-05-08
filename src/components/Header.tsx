'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image'; // Next.js optimized image component
import logo from '@/../public/bad_transparent_cheyne_logo.png'; // adjust path if needed

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-gray-200 bg-white p-4">
      <nav className="mx-auto max-w-5xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <Image src={logo} alt="Logo" width={32} height={32} />
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
