import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-neutral-800">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 transition-shadow hover:shadow-lg hover:shadow-neutral-500 rounded-md p-1">
          <Image
            src="/c-wrench/c-wrench.svg"
            alt="cheyne.dev"
            width={40}
            height={40}
            className="rounded object-cover"
            priority
          />
          <div className="text-lg font-bold tracking-tight">cheyne.dev</div>
        </Link>

        <nav className="flex gap-4 text-sm font-bold text-neutral-950">
          <a href="/" className="hover:text-zinc-500 text-md transition-transform transform hover:scale-105">
            Home
          </a>
          <a href="/posts" className="hover:text-zinc-500 text-md transition-transform transform hover:scale-105">
            Posts
          </a>
        </nav>
      </div>
    </header>
  );
}
