"use client";

import { useEffect, useMemo, useState } from "react";

import { Card } from "@/app/components/standard/Card";

import TimcamInaccuracyReport from "@/app/components/(extras) stuff/timcam/TimcamInaccuracyReport";
import type { TimcamCountEvent } from "@/app/components/(extras) stuff/timcam/types";

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
	const [lastEventLocalMs, setLastEventLocalMs] = useState<number | null>(null);
	const [nowMs, setNowMs] = useState(() => Date.now());

	useEffect(() => {
		const interval = window.setInterval(() => setNowMs(Date.now()), 250);
		return () => window.clearInterval(interval);
	}, []);

	useEffect(() => {
		let cancelled = false;
		const es = new EventSource(sseUrl);

		const handleData = (raw: string) => {
			if (cancelled) return;
			try {
				const parsed = JSON.parse(raw) as TimcamCountEvent;
				setLatest(parsed);
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
	}, [sseUrl]);

	const countDisplay = latest ? String(latest.count) : "—";
	const smoothedDisplay = latest ? latest.smoothed_count.toFixed(2) : "—";

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
			</Card>

			<TimcamInaccuracyReport latestEvent={latest} />
		</div>
	);
}
