export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-800 mt-16">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-neutral-500 flex justify-between">
        <span>© {new Date().getFullYear()} cheyne.dev</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
