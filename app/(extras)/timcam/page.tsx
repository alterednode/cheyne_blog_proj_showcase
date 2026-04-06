import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, siteMeta, siteUrl } from "@/app/lib/site";

import TimcamPageClient from "../../components/(extras) stuff/timcam/TimcamPageClient";

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
					<div className="flex gap-4">
					<p className="max-w-2xl text-sm text-muted-foreground">
						Live estimate of the Tim Hortons line at UBC Okanagan.
					</p>
					<Link href="https://maps.app.goo.gl/kcDxiTVt2LhyM6H9A" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
						See the operating hours on Google Maps
					</Link>
					</div>
				</header>

				<TimcamPageClient />

				<div className="space-y-6 text-sm text-foreground">
					<div>
						<h2 className="text-lg font-semibold mb-2">About this</h2>
						<p>
							This page uses a person detection system built on the public timcam feed to estimate the line size in real time. The feed is low resolution and blurry, so accuracy isn't perfect. Also, when the count reaches 10+, people at the back of the line or extending into the courtyard may be missed.
						</p>
						<p className="mt-2">
							Want to know how it works? Check out my <Link href="/posts/timcam" className="text-blue-500 hover:underline">detailed post</Link> about the project.
						</p>
					</div>

					<div>
						<h2 className="text-lg font-semibold mb-2">API & resources</h2>
						<p>
							The Timcam API which powers this page and is available at{" "}
							<Link
								href="https://timcam-api.cheyne.dev/"
								className="text-blue-500 hover:underline"
							>
								timcam-api.cheyne.dev
							</Link>{" "}
							is for educational, non-commercial use. The source video feed is also available on{" "}
							<Link
								href="https://ok.ubc.ca/current-students/"
								className="text-blue-500 hover:underline"
							>
								UBC Okanagan's student resources page
							</Link>
							.
						</p>
						<p className="mt-2">
							For integration, check out the <Link href="https://timcam-api.cheyne.dev/docs" className="text-blue-500 hover:underline">API documentation</Link>, the <Link href="https://timcam-api.cheyne.dev/timcam_cropped/count/stream" className="text-blue-500 hover:underline">live SSE stream</Link>, or the <Link href="https://timcam-api.cheyne.dev/timcam_cropped/count" className="text-blue-500 hover:underline">JSON snapshot endpoint</Link>.
						</p>
					</div>

					<div>
						<p className="text-xs text-muted-foreground">
							Thanks to UBCO Engagement Services and UBC IT Okanagan for creating and supporting the timcam feed.
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							Questions or feedback? <Link href="mailto:onyx@cheyne.dev" className="text-blue-500 hover:underline">Email me</Link> at onyx@cheyne.dev.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
