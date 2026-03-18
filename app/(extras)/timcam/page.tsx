import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, siteMeta, siteUrl } from "@/app/lib/site";

import TimcamPageClient from "./TimcamPageClient";

const THIS_TITLE =
	"How many people are in line at Tims right now? | Tim Hortons line at UBC Okanagan";
const THIS_DESCRIPTION =
	"Live estimate of how many people are currently in the Tim Hortons line at UBC Okanagan, streamed from the timcam API.";

export const metadata: Metadata = {
	title: THIS_TITLE,
	description: THIS_DESCRIPTION,
	keywords: [
		"Timcam",
		"Tims",
		"Tim Hortons line",
		"UBC Okanagan",
		"live line size",
		"people in line",
		"timcam API",
	],
	alternates: {
		canonical: "/timcam",
	},
	openGraph: {
		type: "website",
		url: "/timcam",
		title: THIS_TITLE,
		description: THIS_DESCRIPTION,
		images: [
			{
				url: siteMeta.ogImage,
				alt: `${siteMeta.name} logo`,
			},
		],
	},
	twitter: {
		card: "summary",
		title: THIS_TITLE,
		description: THIS_DESCRIPTION,
		images: [siteMeta.ogImage],
	},
};

export default function TimcamPage() {
	const pageJsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: THIS_TITLE,
		url: absoluteUrl("/timcam"),
		description: THIS_DESCRIPTION,
		isPartOf: {
			"@type": "WebSite",
			name: siteMeta.name,
			url: siteUrl,
		},
		about: {
			"@type": "Place",
			name: "Tim Hortons at UBC Okanagan",
		},
	};

	return (
		<main className="min-h-screen bg-background text-foreground">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
			/>
			<div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
				<header className="space-y-2">
					<p className="text-xs font-bold uppercase text-muted-foreground">
						Timcam Line Viewer
					</p>
					<h1 className="text-3xl font-semibold">
						How many people are in line at Tims right now?
					</h1>
					<p className="max-w-2xl text-sm text-muted-foreground">
						Live estimate of the Tim Hortons line at UBC Okanagan.
					</p>
				</header>

				<TimcamPageClient />

				<div className="space-y-4 text-sm text-muted-foreground">
					<p>
						This page tracks the approximate size of the Tim Hortons line. The live values above come from a person detection system built on top of the public timcam feed.
					</p>
					<p>
						The source video feed is provided through{" "}
						<Link
							href="https://ok.ubc.ca/current-students/"
							className="text-blue-500 hover:underline"
						>
							UBC Okanagan student resources
						</Link>
						. The API powering this page lives at{" "}
						<Link
							href="https://timcam-api.cheyne.dev/"
							className="text-blue-500 hover:underline"
						>
							timcam-api.cheyne.dev
						</Link>{" "}
						and is intended for educational, non-commercial use.
					</p>
					<p>
						Documentation is available at{" "}
						<Link
							href="https://timcam-api.cheyne.dev/docs"
							className="text-blue-500 hover:underline"
						>
							the Timcam API docs
						</Link>
						, and the raw SSE stream used by this page is exposed at{" "}
						<Link
							href="https://timcam-api.cheyne.dev/timcam_cropped/count/stream"
							className="text-blue-500 hover:underline"
						>
							the stream endpoint
						</Link>
						.
						For the current value, use the JSON snapshot endpoint: <Link href="https://timcam-api.cheyne.dev/timcam_cropped/count" className="text-blue-500 hover:underline"> timcam-api.cheyne.dev/timcam_cropped/count</Link>.
					</p>
					<p>
						Questions or feedback:{" "}
						<Link
							href="mailto:onyx@cheyne.dev"
							className="text-blue-500 hover:underline"
						>
							Onyx@Cheyne.dev
						</Link>
						.
					</p>
				</div>
			</div>
		</main>
	);
}
