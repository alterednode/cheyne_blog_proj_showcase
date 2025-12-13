export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-accent/20 mt-16 bg-gradient-to-r from-card via-accent/5 to-card text-card-foreground shadow-lg shadow-accent/5">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground flex justify-between">
        <span className="font-medium">© {new Date().getFullYear()} <span className="text-primary">cheyne.dev</span></span>
        <span>Built with <span className="text-accent font-semibold">Next.js</span></span>
      </div>
    </footer>
  );
}
