import type { Metadata } from "next";
import { VercelAnalytics } from "@components/telementary/VercelAnalyitics";
import { Geist, Geist_Mono } from "next/font/google";
import { absoluteUrl } from "@/app/lib/site";
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
  title: "Onyx Cheyne",
  description:
    "Blog and project showcase of Onyx Cheyne, a computer science student at UBC Okanagan.",
  icons: {
    icon: "/c-wrench/tiny no bkg.png",
  },
  alternates: {
    types: {
      "application/rss+xml": absoluteUrl("/rss.xml"),
    },
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
