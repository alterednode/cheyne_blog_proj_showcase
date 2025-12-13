export default function SiteFooter() {
  return (
    <footer className="border-t border-border mt-16 bg-card text-card-foreground">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground flex justify-between">
        <span>© {new Date().getFullYear()} cheyne.dev</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
