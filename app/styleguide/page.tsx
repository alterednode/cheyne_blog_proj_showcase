import Link from "next/link";

type Tone = "primary" | "secondary" | "accent" | "muted";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="rounded-xl border border-border bg-card p-5">{children}</div>
    </section>
  );
}

function Swatch({
  label,
  className,
  textClassName,
}: {
  label: string;
  className: string;
  textClassName?: string;
}) {
  return (
    <div className="space-y-2">
      <div className={cn("h-14 w-full rounded-lg border border-border", className)} />
      <p className={cn("text-xs", textClassName ?? "text-muted-foreground")}>{label}</p>
    </div>
  );
}

function Badge({
  tone = "muted",
  children,
}: {
  tone?: Tone;
  children: React.ReactNode;
}) {
  const toneClasses: Record<Tone, string> = {
    muted: "bg-muted text-muted-foreground border-border",
    primary: "bg-primary/10 text-primary border-primary/30",
    secondary: "bg-secondary/10 text-secondary border-secondary/30",
    accent: "bg-accent/10 text-accent border-accent/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone]
      )}
    >
      {children}
    </span>
  );
}

function Button({
  tone = "primary",
  variant = "solid",
  children,
  disabled,
}: {
  tone?: Exclude<Tone, "muted">;
  variant?: "solid" | "outline" | "soft" | "ghost";
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold transition-colors " +
    focusRing +
    " disabled:opacity-50 disabled:pointer-events-none";

  const solid: Record<Exclude<Tone, "muted">, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  };

  const outline: Record<Exclude<Tone, "muted">, string> = {
    primary: "border border-primary/50 bg-background text-primary hover:bg-primary/10",
    secondary: "border border-secondary/50 bg-background text-secondary hover:bg-secondary/10",
    accent: "border border-accent/50 bg-background text-accent hover:bg-accent/10",
  };

  const soft: Record<Exclude<Tone, "muted">, string> = {
    primary: "bg-primary/10 text-primary hover:bg-primary/15 border border-primary/20",
    secondary: "bg-secondary/10 text-secondary hover:bg-secondary/15 border border-secondary/20",
    accent: "bg-accent/10 text-accent hover:bg-accent/15 border border-accent/20",
  };

  // ghost uses neutral surface + tone on hover
  const ghost: Record<Exclude<Tone, "muted">, string> = {
    primary: "bg-transparent text-foreground hover:bg-muted hover:text-primary",
    secondary: "bg-transparent text-foreground hover:bg-muted hover:text-secondary",
    accent: "bg-transparent text-foreground hover:bg-muted hover:text-accent",
  };

  const variantClasses =
    variant === "solid"
      ? solid[tone]
      : variant === "outline"
      ? outline[tone]
      : variant === "soft"
      ? soft[tone]
      : ghost[tone];

  return (
    <button className={cn(base, variantClasses)} disabled={disabled}>
      {children}
    </button>
  );
}

function Callout({
  tone = "accent",
  title,
  children,
}: {
  tone?: Tone;
  title: string;
  children: React.ReactNode;
}) {
  const toneClasses: Record<Tone, string> = {
    muted: "border-border bg-muted/60",
    primary: "border-primary/35 bg-primary/10",
    secondary: "border-secondary/35 bg-secondary/10",
    accent: "border-accent/35 bg-accent/10",
  };

  return (
    <div className={cn("rounded-lg border p-4", toneClasses[tone])}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
        {title}
      </p>
      <div className="mt-2 text-sm text-foreground">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-border" />;
}

function Chip({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "accent-outline" | "accent-soft";
  children: React.ReactNode;
}) {
  const styles: Record<typeof tone, string> = {
    neutral:
      "border border-border bg-background text-foreground hover:bg-muted hover:text-primary",
    "accent-outline":
      "border border-accent/50 bg-background text-accent hover:bg-accent/10",
    "accent-soft": "border border-accent/20 bg-accent/10 text-accent hover:bg-accent/15",
  };

  return (
    <a
      href="#"
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
        styles[tone],
        focusRing
      )}
    >
      {children}
    </a>
  );
}

export default function StyleguidePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        <header className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              UI Playground
            </p>
            <h1 className="text-3xl font-semibold">Theme Style Guide</h1>
            <p className="text-sm text-muted-foreground">
              This page exercises all standard token combinations (surfaces, actions, emphasis)
              to validate contrast in light and dark mode.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button tone="primary" variant="solid">
              Primary CTA
            </Button>
            <Button tone="secondary" variant="solid">
              Secondary CTA
            </Button>
            <Button tone="accent" variant="solid">
              Accent CTA (rare)
            </Button>
            <Button tone="primary" variant="outline">
              Outline
            </Button>
            <Button tone="primary" variant="ghost">
              Ghost
            </Button>
            <Button tone="primary" variant="solid" disabled>
              Disabled
            </Button>
          </div>
        </header>

        <Section
          title="Token swatches"
          description="Quick visual check that surfaces and brand colors are distinct."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Swatch label="bg-background" className="bg-background" />
            <Swatch label="bg-card" className="bg-card" />
            <Swatch label="bg-muted" className="bg-muted" />
            <Swatch label="bg-primary" className="bg-primary" />
            <Swatch label="bg-secondary" className="bg-secondary" />
            <Swatch label="bg-accent" className="bg-accent" />
            <Swatch label="bg-primary/10" className="bg-primary/10" />
            <Swatch label="bg-secondary/10" className="bg-secondary/10" />
            <Swatch label="bg-accent/10" className="bg-accent/10" />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm font-semibold">Border visibility check</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This container should clearly show a 1px border on the page background.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-semibold">Card-on-card check</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Cards should still separate when nested (bg-card inside bg-card).
              </p>
            </div>
          </div>
        </Section>

        <Section
          title="Typography & links"
          description="Check hierarchy, link affordance, and muted readability."
        >
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold">Heading 1 — Page title</h1>
            <h2 className="text-2xl font-semibold">Heading 2 — Section title</h2>
            <h3 className="text-xl font-semibold">Heading 3 — Subsection</h3>

            <p className="text-base">
              Body text is <span className="font-semibold">text-foreground</span>. A standard{" "}
              <Link className="text-primary underline-offset-4 hover:underline" href="#">
                primary link
              </Link>{" "}
              should read clearly, while{" "}
              <Link className="text-accent underline-offset-4 hover:underline" href="#">
                accent link
              </Link>{" "}
              should be used sparingly (typically for special emphasis).
            </p>

            <p className="text-sm text-muted-foreground">
              Muted text is for metadata, timestamps, helper copy, captions, and secondary
              descriptions.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <Badge tone="primary">Primary badge</Badge>
              <Badge tone="secondary">Secondary badge</Badge>
              <Badge tone="accent">Accent badge</Badge>
              <Badge tone="muted">Muted badge</Badge>
            </div>
          </div>
        </Section>

        <Section
          title="Surfaces & cards"
          description="Standard containers you will reuse across pages."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold">Card</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use for most panels and content blocks.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-sm font-semibold">Background panel</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use when you need an inner panel inside a card.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/60 p-4">
              <p className="text-sm font-semibold">Muted panel</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use for subtle sections, footers, or low-priority groups.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold">Nested example</p>
            <p className="mt-1 text-sm text-muted-foreground">
              A card containing an inner background panel.
            </p>
            <div className="mt-3 rounded-lg border border-border bg-background p-4">
              <p className="text-sm">
                Inner panel uses <code>bg-background</code> and <code>border-border</code>.
              </p>
            </div>
          </div>
        </Section>

        <Section
          title="Buttons matrix"
          description="All standard button variants by tone (primary/secondary/accent)."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {(["primary", "secondary", "accent"] as const).map((tone) => (
              <div key={tone} className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold capitalize">{tone}</p>
                  <Badge tone={tone}>{tone}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button tone={tone} variant="solid">
                    Solid
                  </Button>
                  <Button tone={tone} variant="outline">
                    Outline
                  </Button>
                  <Button tone={tone} variant="soft">
                    Soft
                  </Button>
                  <Button tone={tone} variant="ghost">
                    Ghost
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Solid is for CTAs, outline for secondary actions, soft for call-to-attention
                  without dominating, ghost for toolbar / inline actions.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-border bg-background p-4">
            <p className="text-sm font-semibold">Guideline</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Use <span className="font-semibold text-primary">primary</span> for the single
              most important action on a page. Use{" "}
              <span className="font-semibold text-secondary">secondary</span> for supporting
              actions. Use <span className="font-semibold text-accent">accent</span> for special
              emphasis or rare CTAs; avoid using it everywhere.
            </p>
          </div>
        </Section>

        <Section
          title="Callouts & emphasis"
          description="Standard callout styles for notes, warnings, “reach out”, etc."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Callout tone="accent" title="Accent callout (standard emphasis)">
              Use for “Reach out”, “Under construction”, “Featured”, and other non-critical
              attention blocks.
            </Callout>

            <Callout tone="primary" title="Primary callout (brand emphasis)">
              Use when you want a callout to align with your brand color, without being a button.
            </Callout>

            <Callout tone="secondary" title="Secondary callout (alt emphasis)">
              Use sparingly for special sections, or when primary is already heavily used nearby.
            </Callout>

            <Callout tone="muted" title="Muted callout (low priority)">
              Use for hints, helper text, or passive informational notes.
            </Callout>
          </div>
        </Section>

        <Section
          title="Chips / socials styles"
          description="These are secondary actions; neutral default with branded hover is recommended."
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Chip tone="neutral">
                <span className="text-muted-foreground">⧉</span> Neutral chip (recommended)
              </Chip>
              <Chip tone="accent-outline">
                <span className="text-accent">★</span> Accent outline chip
              </Chip>
              <Chip tone="accent-soft">
                <span className="text-accent">★</span> Accent soft chip
              </Chip>
            </div>

            <Divider />

            <div className="flex flex-wrap gap-2">
              <a
                href="#"
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors",
                  "hover:bg-muted hover:text-primary",
                  focusRing
                )}
                aria-label="Icon chip"
              >
                @
              </a>

              <a
                href="#"
                className={cn(
                  "inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground transition-colors",
                  "hover:bg-muted hover:text-primary",
                  focusRing
                )}
              >
                <span className="text-muted-foreground">⧉</span>
                Labeled chip
              </a>

              <a
                href="#"
                className={cn(
                  "inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors",
                  "hover:bg-primary/90",
                  focusRing
                )}
              >
                Featured contact (primary)
              </a>

              <a
                href="#"
                className={cn(
                  "inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground transition-colors",
                  "hover:bg-accent/90",
                  focusRing
                )}
              >
                Rare accent action
              </a>
            </div>
          </div>
        </Section>

        <Section
          title="Forms"
          description="Inputs, selects, and helper text with correct focus/contrast."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-semibold">Text input</span>
                <span className="text-xs text-muted-foreground">helper / metadata</span>
              </div>
              <input
                className={cn(
                  "h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground",
                  focusRing
                )}
                placeholder="Type here…"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold">Select</span>
              <select
                className={cn(
                  "h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground",
                  focusRing
                )}
              >
                <option>Option A</option>
                <option>Option B</option>
                <option>Option C</option>
              </select>
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-semibold">Textarea</span>
              <textarea
                className={cn(
                  "min-h-[96px] w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
                  focusRing
                )}
                placeholder="Longer text…"
              />
              <p className="text-xs text-muted-foreground">
                Use muted-foreground for helper copy. Avoid accent for helper text.
              </p>
            </label>
          </div>
        </Section>

        <Section
          title="Combinations checklist"
          description="A compact matrix of the most common combinations you’ll use."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4 space-y-2">
              <p className="text-sm font-semibold">Standard content block</p>
              <p className="text-sm text-muted-foreground">
                bg-background + border-border + muted metadata.
              </p>
              <div className="flex gap-2">
                <Button tone="primary" variant="solid">
                  Primary
                </Button>
                <Button tone="primary" variant="outline">
                  Secondary action
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-accent/35 bg-accent/10 p-4 space-y-2">
              <p className="text-sm font-semibold">Accent emphasis block</p>
              <p className="text-sm text-muted-foreground">
                Use for callouts that should be noticed but are not CTAs.
              </p>
              <div className="flex gap-2">
                <Button tone="primary" variant="solid">
                  Main action
                </Button>
                <Button tone="accent" variant="soft">
                  Related
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-primary/35 bg-primary/10 p-4 space-y-2">
              <p className="text-sm font-semibold">Primary emphasis block</p>
              <p className="text-sm text-muted-foreground">
                Brand-aligned without feeling like a button.
              </p>
              <div className="flex gap-2">
                <Button tone="primary" variant="outline">
                  Outline
                </Button>
                <Button tone="primary" variant="ghost">
                  Ghost
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-secondary/35 bg-secondary/10 p-4 space-y-2">
              <p className="text-sm font-semibold">Secondary emphasis block</p>
              <p className="text-sm text-muted-foreground">
                Use sparingly; secondary can be high-chroma depending on your palette.
              </p>
              <div className="flex gap-2">
                <Button tone="secondary" variant="outline">
                  Secondary outline
                </Button>
                <Button tone="secondary" variant="soft">
                  Secondary soft
                </Button>
              </div>
            </div>
          </div>
        </Section>

        <footer className="pt-4">
          <p className="text-xs text-muted-foreground">
            Tip: If anything looks “too loud,” reduce where you use solid fills. Prefer neutral
            surfaces (background/card/muted) and use color primarily for text, badges, borders,
            and a single primary CTA.
          </p>
        </footer>
      </div>
    </main>
  );
}
