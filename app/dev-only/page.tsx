import Link from "next/link";
import path from "node:path";
import { access, readdir } from "node:fs/promises";

import { Card } from "@/app/components/standard/Card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function toTitle(slug: string) {
  const words = slug
    .split(/[-_\s]+/g)
    .filter(Boolean)
    .map((w) => w.toLowerCase());

  const upperWords = new Set(["ui", "svg", "mdx", "api"]);

  return words
    .map((w) => {
      if (upperWords.has(w)) return w.toUpperCase();
      return w.slice(0, 1).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

async function exists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getDevToolLinks() {
  const devOnlyDir = path.join(process.cwd(), "app", "dev-only");
  const entries = await readdir(devOnlyDir, { withFileTypes: true });

  const routeFolders = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));

  const candidatePageFiles = ["page.tsx", "page.ts", "page.jsx", "page.js", "page.mdx"];

  const links: Array<{ href: string; title: string; description: string }> = [];

  for (const folderName of routeFolders) {
    const folderPath = path.join(devOnlyDir, folderName);
    const hasPage = await Promise.any(
      candidatePageFiles.map(async (fileName) => {
        const ok = await exists(path.join(folderPath, fileName));
        if (!ok) throw new Error("missing");
        return true;
      })
    ).catch(() => false);

    if (!hasPage) continue;

    links.push({
      href: `/dev-only/${folderName}`,
      title: toTitle(folderName),
      description: "Dev playground page.",
    });
  }

  return links;
}

export default async function DevOnlyIndexPage() {
  const devToolLinks = await getDevToolLinks();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Dev Only
          </p>
          <h1 className="text-3xl font-semibold">Dev Tools</h1>
          <p className="text-sm text-muted-foreground">
            Handy links to internal playground pages used while building the site.
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {devToolLinks.length ? (
            devToolLinks.map((tool) => (
                <Link
                    key={tool.href}
                  href={tool.href}
                  className={
                    "group block rounded-xl border border-border bg-background/40 p-5 transition-colors " +
                    "hover:bg-muted/40 " +
                    focusRing
                  }
                >
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold group-hover:text-primary">
                      {tool.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {tool.href}
                    </p>
                  </div>
                </Link>

            ))
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              No dev tool routes found under <span className="font-semibold text-foreground">app/dev-only/*</span>.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
