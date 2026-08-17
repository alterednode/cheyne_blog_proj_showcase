export default function SiteFooter() {
  return (
    <footer className="relative mt-16 border-t-2 border-border bg-linear-to-r from-card via-accent/5 to-card text-card-foreground shadow-lg shadow-accent/5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-primary opacity-60" />
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground flex justify-between">
        <span className="font-medium">© {new Date().getFullYear()} <span className="text-primary">cheyne.dev</span></span>
        <span>Built with <span className="text-accent font-semibold">Next.js</span></span>
      </div>
    </footer>
  );
}
