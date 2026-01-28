import type { Metadata } from "next";
import { VercelAnalytics } from "@components/telementary/VercelAnalyitics";
import { Geist, Geist_Mono } from "next/font/google";
import { absoluteUrl, siteMeta, siteUrl } from "@/app/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteMeta.title,
    template: siteMeta.titleTemplate,
  },
  description: siteMeta.description,
  keywords: [...siteMeta.keywords],
  authors: [{ name: siteMeta.name, url: siteUrl }],
  creator: siteMeta.name,
  icons: {
    icon: siteMeta.icon,
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": absoluteUrl("/rss.xml"),
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: siteMeta.name,
    title: siteMeta.title,
    description: siteMeta.description,
    images: [
      {
        url: siteMeta.ogImage,
        alt: `${siteMeta.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [siteMeta.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary/25 selection:text-foreground`}
      >
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
