import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b-2 shadow-lg">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md p-1 transition-all hover:shadow-xl"
        >
          <Image
            src="/c-wrench/c-wrench bkg.svg"
            alt="cheyne.dev"
            width={40}
            height={40}
            className="rounded object-cover"
            priority
          />
          <div className="text-lg font-bold tracking-tight">
            cheyne.dev
          </div>
        </Link>

        <nav className="flex gap-4 text-sm font-bold">
          <a
            href="/"
            className="text-md transition-all hover:scale-110"
          >
            Home
          </a>
          <a
            href="/posts"
            className="text-md transition-all hover:scale-110"
          >
            Posts
          </a>
        </nav>
      </div>
    </header>
  );
}
