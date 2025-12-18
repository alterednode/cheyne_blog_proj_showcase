"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { Card } from "@/app/components/standard/Card";

type Tone = "primary" | "secondary" | "accent";

export interface MDXMeterProps {
  label: string;
  subtitle?: string;
  value: number; // 0-100
  tone?: Tone;
  showValue?: boolean;
  compact?: boolean;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function MDXMeter({
  label,
  subtitle,
  value,
  tone = "primary",
  showValue = true,
  compact = false,
}: MDXMeterProps) {
  const safeValue = clamp(Math.round(value), 0, 100);

  const toneClasses: Record<Tone, { bar: string; badge: string }> = {
    primary: { bar: "bg-primary", badge: "bg-primary/15 border-primary/30" },
    secondary: { bar: "bg-secondary", badge: "bg-secondary/15 border-secondary/30" },
    accent: { bar: "bg-accent", badge: "bg-accent/15 border-accent/30" },
  };

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className={compact ? "text-sm font-semibold" : "text-base font-semibold"}>
            {label}
          </div>
          <div className={compact ? "text-xs text-muted-foreground hidden" : "text-sm text-muted-foreground"}>
            {subtitle}
          </div>
        </div>
        {showValue && (
          <div
            className={[
              "shrink-0 rounded-full border px-2 py-1 text-xs font-medium text-foreground",
              toneClasses[tone].badge,
            ].join(" ")}
            aria-label={`Value: ${safeValue}%`}
          >
            {safeValue}%
          </div>
        )}
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full border border-border bg-muted">
        <div
          className={["h-full", toneClasses[tone].bar].join(" ")}
          style={{ width: `${safeValue}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export interface MDXMeterPlaygroundProps {
  defaultLabel?: string;
  defaultSubtitle?: string;
  defaultValue?: number;
  defaultTone?: Tone;
  defaultShowValue?: boolean;
  defaultCompact?: boolean;
}

export function MDXMeterPlayground({
  defaultLabel = "Build progress",
  defaultSubtitle = "A tiny prop-driven component",
  defaultValue = 62,
  defaultTone = "primary",
  defaultShowValue = true,
  defaultCompact = false,
}: MDXMeterPlaygroundProps) {
  const uid = useId();

  const [label, setLabel] = useState(defaultLabel);
  const [subtitle, setSubtitle] = useState(defaultSubtitle);
  const [value, setValue] = useState(clamp(defaultValue, 0, 100));
  const [tone, setTone] = useState<Tone>(defaultTone);
  const [showValue, setShowValue] = useState(defaultShowValue);
  const [compact, setCompact] = useState(defaultCompact);

  const usage = useMemo(() => {
    const props: string[] = [`label=\"${label.replace(/\"/g, "\\\"")}\"`, `value={${value}}`];
    if (tone !== "primary") props.push(`tone=\"${tone}\"`);
    if (!showValue) props.push("showValue={false}");
    if (compact) props.push("compact");
    return `<MDXMeter ${props.join(" ")} />`;
  }, [compact, label, showValue, tone, value]);

  return (
    <Card className="my-6 p-4">
      <div className="flex flex-col gap-4">
        <div className="text-sm font-semibold text-foreground">Interactive props playground</div>

          <Card className="p-2">
            <MDXMeter label={label} subtitle={subtitle} value={value} tone={tone} showValue={showValue} compact={compact} />
          </Card>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="space-y-4">
              <div>
                <label htmlFor={`${uid}-label`} className="block text-xs font-medium text-muted-foreground">
                  Label
                </label>
                <input
                  id={`${uid}-label`}
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div>
                <label htmlFor={`${uid}-subtitle`} className="block text-xs font-medium text-muted-foreground">
                  Subtitle
                </label>
                <input
                  id={`${uid}-subtitle`}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div>
                <label htmlFor={`${uid}-value`} className="block text-xs font-medium text-muted-foreground">
                  Value: <span className="text-foreground">{value}%</span>
                </label>
                <input
                  id={`${uid}-value`}
                  type="range"
                  min={0}
                  max={100}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="mt-2 w-full"
                />
              </div>

              <div>
                <label htmlFor={`${uid}-tone`} className="block text-xs font-medium text-muted-foreground">
                  Tone
                </label>
                <select
                  id={`${uid}-tone`}
                  value={tone}
                  onChange={(e) => setTone(e.target.value as Tone)}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="accent">Accent</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showValue}
                    onChange={(e) => setShowValue(e.target.checked)}
                    className="h-4 w-4"
                  />
                  Show value
                </label>

                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={compact}
                    onChange={(e) => setCompact(e.target.checked)}
                    className="h-4 w-4"
                  />
                  Compact
                </label>
              </div>

              <div>
                <div className="text-xs font-medium text-muted-foreground">Usage</div>
                <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted p-3 text-xs">
                  <code>{usage}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
    </Card>
  );
}
