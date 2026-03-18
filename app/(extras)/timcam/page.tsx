"use client";

import { useEffect, useMemo, useState } from "react";

import { Card } from "@/app/components/standard/Card";
import Link from "next/link";

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
		<main className="min-h-screen bg-background text-foreground">
			<div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
				<header className="space-y-2">
					<p className="text-xs font-bold uppercase text-muted-foreground">
						Timcam API Viewer
					</p>
					<h1 className="text-3xl font-semibold">Live Line Count</h1>
				</header>

				<Card className="p-6">
					<div className="grid gap-6 sm:grid-cols-3">
						<div className="space-y-2">
							<p className="text-m font-bold uppercase text-muted-foreground">
								Count
							</p>
							<p className="text-5xl font-semibold tabular-nums">{countDisplay}</p>
							<p className="text-sm text-muted-foreground">
								Raw count from the latest event.
							</p>
						</div>

						<div className="space-y-2">
							<p className="text-m font-bold uppercase text-muted-foreground">
								Smoothed Count
							</p>
							<p className="text-5xl font-semibold tabular-nums">
								{smoothedDisplay}
							</p>
							<p className="text-sm text-muted-foreground">
								Filtered count using a smoothing algorithm.
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

				<p className="text-sm text-muted-foreground">
					Data is streamed live from the Timcam API that I created, based on the video feed from the timcam: <Link href="https://ok.ubc.ca/current-students/" className="text-blue-500 hover:underline">
						https://ok.ubc.ca/current-students
					</Link>
					.<br></br>The timcamAPI at <Link href="https://timcam-api.cheyne.dev/" className="text-blue-500 hover:underline">
						https://timcam-api.cheyne.dev
					</Link> is for  educational / non-commercial use only.
					<br></br>
					Thank you to UBCO IT / Engagement Services for the timcam feed and for not shooting this project down.
					<br></br>
					I plan on sprucing up this page some, and making a blog post about the timcam and the API at some point, but I wanted to get this up and running first.
					<br></br>
					<br></br>
					Feel free to reach out to me if you have any questions or want to chat about the timcam or the API! <Link href="mailto:onyx@cheyne.dev" className="text-blue-500 hover:underline">
						onyx@cheyne.dev
					</Link>
					<br></br>
					<br></br>
					<Link href="https://timcam-api.cheyne.dev/docs" className="text-blue-500 hover:underline">
						API Documentation
					</Link>
					<br></br>
					<Link href="https://timcam-api.cheyne.dev/timcam_cropped/count/stream" className="text-blue-500 hover:underline">
						Stream Endpoint that this page connects to
					</Link>

				</p>



			</div>
		</main>
	);
}
