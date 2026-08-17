"use client";

import { useEffect, useMemo, useState } from "react";

import { Card } from "@/app/components/standard/Card";

import TimcamInaccuracyReport from "@/app/components/(extras) stuff/timcam/TimcamInaccuracyReport";
import type { TimcamCountEvent } from "@/app/components/(extras) stuff/timcam/types";

const MAX_HISTORY_SIZE = 240;
const MAX_WINDOW_SIZE = 120;

function formatSeconds(seconds: number) {
	if (!Number.isFinite(seconds) || seconds < 0) return "—";
	if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
	if (seconds < 10) return `${seconds.toFixed(1)}s`;
	if (seconds < 60) return `${Math.round(seconds)}s`;
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.round(seconds % 60);
	return `${minutes}m ${remainingSeconds}s`;
}

export default function TimcamPageClient() {
	const sseUrl = "https://timcam-api.cheyne.dev/timcam_cropped/count/stream";

	const [latest, setLatest] = useState<TimcamCountEvent | null>(null);
	const [history, setHistory] = useState<TimcamCountEvent[]>([]);
	const [lastEventLocalMs, setLastEventLocalMs] = useState<number | null>(null);
	const [nowMs, setNowMs] = useState(() => Date.now());
	const [windowSize, setWindowSize] = useState(20);
	const [reportOpen, setReportOpen] = useState(false);

	useEffect(() => {
		if (reportOpen) return;
		const interval = window.setInterval(() => setNowMs(Date.now()), 250);
		return () => window.clearInterval(interval);
	}, [reportOpen]);

	useEffect(() => {
		let cancelled = false;
		const es = new EventSource(sseUrl);

		const handleData = (raw: string) => {
			if (cancelled) return;
			if (reportOpen) return;
			try {
				const parsed = JSON.parse(raw) as TimcamCountEvent;
				setLatest(parsed);
				setHistory((current) => {
					const next = [...current, parsed];
					if (next.length <= MAX_HISTORY_SIZE) return next;
					return next.slice(-MAX_HISTORY_SIZE);
				});
				setLastEventLocalMs(Date.now());
			} catch {
				// Ignore malformed payloads.
				// Wish I could setup something to notify myself about these because something has gone wrong with my server.
			}
		};

		const onCount = (ev: MessageEvent<string>) => handleData(ev.data);
		const onMessage = (ev: MessageEvent<string>) => handleData(ev.data);

		es.addEventListener("count", onCount as EventListener);
		es.onmessage = onMessage;

		return () => {
			cancelled = true;
			es.removeEventListener("count", onCount as EventListener);
			es.close();
		};
	}, [sseUrl, reportOpen]);

	const countDisplay = latest ? String(latest.count) : "—";
	const smoothedDisplay = latest ? latest.smoothed_count.toFixed(2) : "—";
	const effectiveWindowSize = Math.min(windowSize, history.length);

	const recentWindow = useMemo(() => {
		if (effectiveWindowSize === 0) return [];
		return history.slice(-effectiveWindowSize);
	}, [effectiveWindowSize, history]);

	const recentMaxCountDisplay = useMemo(() => {
		if (recentWindow.length === 0) return "—";
		return String(Math.max(...recentWindow.map((event) => event.count)));
	}, [recentWindow]);

	const recentMaxSmoothedDisplay = useMemo(() => {
		if (recentWindow.length === 0) return "—";
		return Math.max(...recentWindow.map((event) => event.smoothed_count)).toFixed(2);
	}, [recentWindow]);

	const stalenessSeconds = useMemo(() => {
		if (!latest) return NaN;

		// Prefer server-provided timestamp (data age), fallback to local receive time.
		if (Number.isFinite(latest.timestamp)) {
			return Math.max(0, nowMs / 1000 - latest.timestamp);
		}

		if (lastEventLocalMs == null) return NaN;
		return Math.max(0, (nowMs - lastEventLocalMs) / 1000);
	}, [latest, lastEventLocalMs, nowMs]);

	return (
		<div className="space-y-6">
			<Card className="p-6">
				<div className="grid gap-6 sm:grid-cols-3">
					<div className="space-y-2">
						<p className="text-m font-bold uppercase text-muted-foreground">
							People in Line
						</p>
						<p className="text-5xl font-semibold tabular-nums">
							{countDisplay}
						</p>
						<p className="text-sm text-muted-foreground">
							Estimated number of people in the line from the latest event.
						</p>
					</div>

					<div className="space-y-2">
						<p className="text-m font-bold uppercase text-muted-foreground">
							Smoothed Estimate
						</p>
						<p className="text-5xl font-semibold tabular-nums">
							{smoothedDisplay}
						</p>
						<p className="text-sm text-muted-foreground">
							Stabilized estimate of people in line using a smoothing algorithm.
						</p>
					</div>

					<div className="space-y-2">
						<p className="text-m font-bold uppercase text-muted-foreground">
							Staleness
						</p>
						<p className="text-5xl font-semibold tabular-nums">
							{formatSeconds(stalenessSeconds)}
						</p>
						<p className="text-sm text-muted-foreground">
							How long ago the latest data was processed. (up to 15s is normal)
						</p>
					</div>
				</div>

				<details className="mt-6">
					<summary className="cursor-pointer text-xs font-semibold uppercase text-muted-foreground">
						Show Recent Max Counts
					</summary>
					<p className="mt-3 text-sm text-muted-foreground">
						These max values may be more accurate at reflecting how long the line actually is, since the raw count can fluctuate a lot. It also may just show you an overestimate, I've added it for fun.
					</p>
					<div className="mt-4 grid gap-6 sm:grid-cols-3">
						<div className="space-y-2">
							<p className="text-sm font-semibold uppercase text-muted-foreground">
								Max Count (Last {windowSize} Updates)
							</p>
							<p className="text-lg font-bold  tabular-nums">{recentMaxCountDisplay}</p>
							<p className="text-xs text-muted-foreground">
								Highest raw count across the last {effectiveWindowSize} events.
							</p>
						</div>

						<div className="space-y-2">
							<p className="text-sm font-semibold uppercase text-muted-foreground">
								Max Smoothed (Last {windowSize} Updates)
							</p>
							<p className="text-lg font-bold  tabular-nums">{recentMaxSmoothedDisplay}</p>
							<p className="text-xs text-muted-foreground">
								Highest smoothed estimate across the last {effectiveWindowSize} events.
							</p>
						</div>

						<div className="space-y-3">
							<div className="flex items-center justify-between gap-4">
								<label
									htmlFor="timcam-window-size"
									className="text-sm font-semibold uppercase text-muted-foreground"
								>
									Window Size
								</label>
								<p className="text-sm font-semibold tabular-nums text-foreground">
									{windowSize}
								</p>
							</div>
							<input
								id="timcam-window-size"
								type="range"
								min={1}
								max={MAX_WINDOW_SIZE}
								value={windowSize}
								onChange={(event) => setWindowSize(Number(event.target.value))}
								className="w-full"
							/>
							<p className="text-sm text-muted-foreground">
								Controls how many recent events are used for the max values.
							</p>
						</div>
					</div>
				</details>
			</Card>

			<TimcamInaccuracyReport latestEvent={latest} onOpenChange={setReportOpen} />
		</div>
	);
}
