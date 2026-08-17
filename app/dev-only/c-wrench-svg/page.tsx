import * as React from "react";
import {
  CWrenchIcon,
  CWrenchIconWithBackground,
} from "@components/custom-icons/c-wrench";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-background/60 p-5 shadow-sm">
      <div className="mb-4 text-sm font-semibold text-foreground/80">
        {title}
      </div>
      {children}
    </div>
  );
}

export default function IconDemoPage() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-10 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          WrenchC Icon Variations
        </h1>
        <p className="text-sm text-foreground/70">
          Recolor via <code>currentColor</code> (Tailwind <code>text-*</code>)
          plus optional background/stroke props.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card title="Base icon (currentColor)">
          <div className="flex flex-wrap items-center gap-6">
            <CWrenchIcon className="h-8 w-8 text-foreground" title="Default" />
            <CWrenchIcon className="h-10 w-10 text-primary" title="Primary" />
            <CWrenchIcon className="h-12 w-12 text-secondary" title="Secondary" />
            <CWrenchIcon className="h-14 w-14 text-accent" title="Accent" />
            <CWrenchIcon className="h-16 w-16 text-foreground/40" title="Muted" />
          </div>
        </Card>

        <Card title="Inline color override (style.color)">
          <div className="flex flex-wrap items-center gap-6">
            <CWrenchIcon className="h-8 w-8" style={{ color: "#cb3bd8" }} />
            <CWrenchIcon className="h-10 w-10" style={{ color: "#11ffdf" }} />
            <CWrenchIcon className="h-12 w-12" style={{ color: "#288319" }} />
            <CWrenchIcon className="h-14 w-14" style={{ color: "var(--foreground)" }} />
          </div>
        </Card>

        <Card title="With background (bg + stroke independent)">
          <div className="flex flex-wrap items-center gap-6">
            <CWrenchIconWithBackground
              className="h-14 w-14 text-primary"
              bgColor="var(--background)"
              bgStrokeColor="var(--background)"
            />
            <CWrenchIconWithBackground
              className="h-14 w-14 text-accent"
              bgColor="transparent"
              bgStrokeColor="var(--foreground)"
            />
            <CWrenchIconWithBackground
              className="h-14 w-14 text-foreground"
              bgColor="var(--muted)"
              bgStrokeColor="var(--muted)"
            />
            <CWrenchIconWithBackground
              className="h-14 w-14 text-secondary"
              bgColor="#1f061f"
              bgStrokeColor="#1f061f"
            />
          </div>
        </Card>

        <Card title="Hover/focus states">
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="group inline-flex items-center gap-3 rounded-xl border border-foreground/10 bg-background px-4 py-3 shadow-sm transition hover:border-foreground/20 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <CWrenchIconWithBackground
                className="h-9 w-9 text-foreground transition group-hover:text-primary"
                bgColor="var(--muted)"
                bgStrokeColor="var(--muted)"
              />
              <span className="text-sm font-medium">
                Hover changes icon color
              </span>
            </button>

            <button
              type="button"
              className="group inline-flex items-center gap-3 rounded-xl border border-foreground/10 bg-background px-4 py-3 shadow-sm transition hover:border-foreground/20 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <CWrenchIcon
                className="h-9 w-9 text-accent transition group-hover:text-secondary"
              />
              <span className="text-sm font-medium">
                No background variant
              </span>
            </button>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Palette grid</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "foreground", cls: "text-foreground", bg: "var(--background)" },
            { label: "primary", cls: "text-primary", bg: "var(--background)" },
            { label: "secondary", cls: "text-secondary", bg: "var(--background)" },
            { label: "accent", cls: "text-accent", bg: "var(--background)" },
            { label: "muted", cls: "text-foreground/50", bg: "var(--muted)" },
            { label: "inverse", cls: "text-background", bg: "var(--foreground)" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-foreground/10 p-4"
              style={{ background: item.bg }}
            >
              <div className="flex items-center gap-3">
                <CWrenchIcon className={`h-10 w-10 ${item.cls}`} />
                <div className="text-xs font-medium text-foreground/80">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
