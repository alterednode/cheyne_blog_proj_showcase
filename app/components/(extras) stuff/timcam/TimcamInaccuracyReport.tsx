"use client";

import { useState } from "react";

import type { TimcamCountEvent } from "@/app/components/(extras) stuff/timcam/types";

const focusRing =
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
	"focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function cn(...parts: Array<string | undefined | false>) {
	return parts.filter(Boolean).join(" ");
}

export default function TimcamInaccuracyReport({
	latestEvent,
	onOpenChange,
}: {
	latestEvent: TimcamCountEvent | null;
	onOpenChange?: (open: boolean) => void;
}) {
	const ingressUrl = "https://reporting.timcam-api.cheyne.dev/timcam/report";

	const [frozenEvent, setFrozenEvent] = useState<TimcamCountEvent | null>(null);

	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitOk, setSubmitOk] = useState(false);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmitOk(false);
		setSubmitError(null);

		const eventToSubmit = frozenEvent ?? latestEvent;

		if (!eventToSubmit) {
			setSubmitError("No live data yet — wait for the first update, then submit.");
			return;
		}

		if (!ingressUrl) {
			setSubmitError("Reporting is not configured right now.");
			return;
		}

		const form = e.currentTarget;
		const data = new FormData(form);

		const countRaw = String(data.get("reportedCount") ?? "").trim();
		const reportedCount = Number(countRaw);
		if (!Number.isInteger(reportedCount) || reportedCount < 0 || reportedCount > 200) {
			setSubmitError("Real count must be an integer between 0 and 200.");
			return;
		}

		const notes = String(data.get("notes") ?? "");
		const website = String(data.get("website") ?? "");

		setSubmitting(true);
		try {
			const res = await fetch(ingressUrl, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					reportedCount,
					notes,
					pageUrl: window.location.href,
					submittedAtIso: new Date().toISOString(),
					latestEvent: eventToSubmit,
					website,
				}),
			});

			if (!res.ok) {
				let message = `Request failed (${res.status})`;
				try {
					const json = (await res.json()) as { error?: string };
					if (json?.error) message = json.error;
				} catch {
					// ignore
				}
				setSubmitError(message);
				return;
			}

			form.reset();
			setSubmitOk(true);
		} catch {
			setSubmitError("Network error — please try again.");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<details
			className="group"
			onToggle={(e) => {
				const open = (e.currentTarget as HTMLDetailsElement).open;
				if (open) {
					setFrozenEvent(latestEvent);
				} else {
					setFrozenEvent(null);
				}
				onOpenChange?.(open);
			}}
		>
			<summary
				className={cn(
					"inline-flex items-center justify-center gap-2 cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors",
					"bg-primary hover:bg-primary/90",
					focusRing
				)}
			>
				<svg
					className="w-4 h-4 transition-transform duration-200 group-open:rotate-90 flex-shrink-0"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
				<span>Feedback</span>
			</summary>

			<form onSubmit={onSubmit} className="mt-3 space-y-4 px-2">
				<p className="text-sm text-muted-foreground">
					This helps tune the estimate. Opening freezes the count so you can report without it changing. Close to resume live updates.
				</p>

				<div className="grid gap-4 md:grid-cols-2">
					<label className="space-y-2">
						<span className="text-sm font-semibold">Real count</span>
						<input
							type="number"
							name="reportedCount"
							inputMode="numeric"
							min={-1}
							max={200}
							required
							disabled={submitting}
							className={cn(
								"h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground",
								focusRing
							)}
							placeholder="e.g. 7"
						/>
					</label>

					<label className="space-y-2 md:col-span-2">
						<span className="text-sm font-semibold">Notes (optional)</span>
						<textarea
							name="notes"
							disabled={submitting}
							className={cn(
								"min-h-20 w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
								focusRing
							)}
							placeholder="Anything that helps (e.g. line wraps around corner, camera obscured)…"
						/>
					</label>
				</div>

				<input
					type="text"
					name="website"
					autoComplete="off"
					tabIndex={-1}
					className="hidden"
					aria-hidden="true"
				/>

				{submitError ? <p className="text-sm text-accent">{submitError}</p> : null}
				{submitOk ? (
					<p className="text-sm text-primary">Thanks — report received.</p>
				) : null}

				<div className="flex items-center gap-3">
					<button
						type="submit"
						disabled={submitting}
						className={cn(
							"inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors",
							"hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none",
							focusRing
						)}
					>
						{submitting ? "Sending…" : "Send"}
					</button>
					<p className="text-xs text-muted-foreground">Accuracy feedback only please! Email me for anything else: onyx@cheyne.dev</p>
				</div>
			</form>
		</details>
	);
}
