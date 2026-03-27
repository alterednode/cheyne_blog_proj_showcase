export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t-2 border-border bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl justify-between gap-4 px-4 py-6 text-sm text-muted-foreground">
        <span className="font-medium">&copy; {new Date().getFullYear()} cheyne.dev</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
