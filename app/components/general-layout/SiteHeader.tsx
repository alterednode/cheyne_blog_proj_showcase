import Image from "next/image";
import Link from "next/link";
import {CWrenchIcon,CWrenchIconWithBackground} from "@components/custom-icons/c-wrench"

export default function SiteHeader() {
  return (
    <header className="relative border-b-2 border-border bg-background text-foreground shadow-lg">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md p-1 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <CWrenchIconWithBackground
            className="h-10 w-10 text-foreground/70"
            bgColor="var(--background)"
            bgStrokeColor="var(--background)"
          />
          <div className="text-lg font-bold tracking-tight">
            cheyne.dev
          </div>
        </Link>

        <nav className="flex gap-4 text-md font-bold">
          <a
            href="/"
            className="text-md text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Home
          </a>
          <a
            href="/posts"
            className="text-md text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Posts
          </a>
        </nav>
      </div>
      
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-primary via-secondary to-accent opacity-70" />
    </header>
  );
}
