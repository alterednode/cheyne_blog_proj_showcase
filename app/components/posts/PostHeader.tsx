import type { Post } from "@/app/lib/content/schema";
import Image from "next/image";
import { FiArrowRight, FiExternalLink, FiGithub, FiArrowUpRight } from "react-icons/fi";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const {
    title,
    description,
    date,
    updated,
    tags,
    hideDate,
    state,
    hero,
    repo,
    live,
    stack,
    status,
    type,
  } = post;

  const formattedDate = hideDate ? null : formatDate(date);
  const formattedUpdated = updated ? formatDate(updated) : null;
  const updatedDateTime = updated ?? null;

  return (
    <header className="mb-10">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-4xl md:text-5xl">{title}</h1>
            <PostBadges type={type} status={status} state={state} />
          </div>
          <p className="max-w-prose text-base text-muted-foreground md:text-lg">{description}</p>
        </div>

        {(formattedDate || formattedUpdated || repo || live) ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {formattedDate || formattedUpdated ? (
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                {formattedDate ? (
                  <MetaPill label="Published">
                    <time dateTime={date} className="font-medium text-foreground">
                      {formattedDate}
                    </time>
                  </MetaPill>
                ) : null}
                {formattedUpdated && updatedDateTime ? (
                  <MetaPill label="Updated">
                    <time dateTime={updatedDateTime} className="font-medium text-foreground">
                      {formattedUpdated}
                    </time>
                  </MetaPill>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {tags?.length || stack?.length ? (
          <section className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Tags
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground md:text-right">
                Tech stack
              </p>
            </div>

            <div className="flex flex-wrap items-start gap-2">
              {tags?.length ? (
                <ul className="flex flex-wrap gap-2" aria-label="Tags">
                  {tags.map((item) => (
                    <li key={item}>
                      <Pill tone="muted">{item}</Pill>
                    </li>
                  ))}
                </ul>
              ) : null}

              {stack?.length ? (
                <ul
                  className="flex min-w-0 flex-1 flex-wrap justify-end gap-2"
                  aria-label="Tech stack"
                >
                  {stack.map((item) => (
                    <li key={item}>
                      <Pill tone="accent">{item}</Pill>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ) : null}

      </div>

      {hero ? (
        <div className="mt-8">
          <div className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <Image
              src={hero}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent" />
          </div>
        </div>
      ) : null}
      {repo || live ? (
        <div className="flex flex-wrap gap-3 mt-6">
          {repo ? (
            <ActionLink
              href={repo}
              variant="secondary"
              label="Repository"
              subLabel={hostFromUrl(repo) ?? undefined}
            />
          ) : null}
          {live ? (
            <ActionLink
              href={live}
              variant="primary"
              label="Check it out"
              subLabel={hostFromUrl(live) ?? undefined}
            />
          ) : null}
        </div>
      ) : null}
    </header>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type BadgeTone = "muted" | "primary" | "secondary" | "accent";

function Badge({ tone, children }: { tone: BadgeTone; children: React.ReactNode }) {
  const tones: Record<BadgeTone, string> = {
    muted: "border-border bg-muted/60 text-muted-foreground",
    primary: "border-primary/30 bg-primary/10 text-foreground",
    secondary: "border-secondary/30 bg-secondary/10 text-foreground",
    accent: "border-accent/35 bg-accent/10 text-foreground",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone],
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function PostBadges({
  type,
  status,
  state,
}: {
  type: Post["type"];
  status: Post["status"];
  state: Post["state"];
}) {
  const typeLabel = type === "project" ? "Project" : "Blog";

  const stateInfo: Record<NonNullable<Post["state"]>, { label: string; tone: BadgeTone }> = {
    "in-progress": { label: "In progress", tone: "accent" },
    completed: { label: "Completed", tone: "primary" },
    paused: { label: "Paused", tone: "secondary" },
  };

  const stateBadge = state ? stateInfo[state] : null;
  const showDraft = status === "draft";

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Badge tone="muted">{typeLabel}</Badge>
      {stateBadge ? <Badge tone={stateBadge.tone}>{stateBadge.label}</Badge> : null}
      {showDraft ? <Badge tone="accent">Draft</Badge> : null}
    </div>
  );
}

function MetaPill({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1">
      <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      {children}
    </span>
  );
}

type PillTone = "muted" | "accent";

function Pill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: PillTone;
}) {
  const tones: Record<PillTone, string> = {
    muted:
      "border-border bg-muted/60 text-muted-foreground hover:border-accent/35 hover:bg-muted hover:text-foreground",
    accent:
      "border-border bg-background text-muted-foreground hover:border-primary/35 hover:bg-muted hover:text-foreground",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
        tones[tone],
      ].join(" ")}
    >
      {children}
    </span>
  );
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function ActionLink({
  href,
  label,
  subLabel,
  variant,
}: {
  href: string;
  label: string;
  subLabel?: string;
  variant: "primary" | "secondary";
}) {
  const variants: Record<"primary" | "secondary", string> = {
    primary: "border-primary/30 bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "border-border bg-background text-foreground hover:bg-muted",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group inline-flex items-center gap-2 rounded-md border px-4 py-2 text-left transition-colors",
        focusRing,
        variants[variant],
      ].join(" ")}
    >
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold">{label}</span>
        {subLabel ? (
          <span className="text-xs opacity-80">{subLabel}</span>
        ) : null}
      </span>
      <span className="ml-1 opacity-70 transition-opacity group-hover:opacity-100">
        <FiExternalLink className="h-5 w-5" aria-hidden="true" />
      </span>
    </a>
  );
}

function hostFromUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}
