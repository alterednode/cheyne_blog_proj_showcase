export default function SiteHeader() {
  return (
    <header className="border-b border-neutral-800">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="text-sm font-semibold tracking-tight">
          cheyne.dev
        </div>

        <nav className="flex gap-4 text-sm text-neutral-400">
          <a href="/" className="hover:text-neutral-200 transition">
            Home
          </a>
          <a href="/posts" className="hover:text-neutral-200 transition">
            Posts
          </a>
        </nav>
      </div>
    </header>
  );
}
