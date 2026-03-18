"use client";

import { useEffect, useMemo, useState } from "react";

import { Card } from "@/app/components/standard/Card";

type TimcamCountEvent = {
	camera: string;
	roi_name: string;
	roi: Array<[number, number]>;
	count: number;
	smoothed_count: number;
	smoothing_type: string;
	timestamp: number;
	timestamp_iso: string;
	sequence: number;
};

function formatSeconds(seconds: number) {
	if (!Number.isFinite(seconds) || seconds < 0) return "—";
	if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
	if (seconds < 10) return `${seconds.toFixed(1)}s`;
	if (seconds < 60) return `${Math.round(seconds)}s`;
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.round(seconds % 60);
	return `${minutes}m ${remainingSeconds}s`;
}

export default function TimcamPage() {
	const sseUrl =
		process.env.NEXT_PUBLIC_TIMCAM_SSE_URL ??
		"https://timcam-api.cheyne.dev/timcam_cropped/count/stream";

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
		<main className="min-h-screen bg-background text-foreground">
			<div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
				<header className="space-y-2">
					<p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
						Timcam
					</p>
					<h1 className="text-3xl font-semibold">Live Count</h1>
				</header>

				<Card className="p-6">
					<div className="grid gap-6 sm:grid-cols-3">
						<div className="space-y-2">
							<p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
								Count
							</p>
							<p className="text-4xl font-semibold tabular-nums">{countDisplay}</p>
						</div>

						<div className="space-y-2">
							<p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
								Smoothed
							</p>
							<p className="text-4xl font-semibold tabular-nums">
								{smoothedDisplay}
							</p>
						</div>

						<div className="space-y-2">
							<p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
								Staleness
							</p>
							<p className="text-4xl font-semibold tabular-nums">
								{formatSeconds(stalenessSeconds)}
							</p>
						</div>
					</div>
				</Card>
			</div>
		</main>
	);
}
