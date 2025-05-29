import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from '@/components/base-site-stuff/Header';

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
  title: "Onyx's Blog and Project Showcase",
  description: "Onyx Cheyne's blog posts and project showcases, a dive into some things they've made, how they did it and what they thought about the process.",
  keywords: ["Onyx Cheyne", "blog", "projects", "portfolio", "development", "creative"],
  authors: [{ name: "Onyx Cheyne" }],
  creator: "Onyx Cheyne",
  metadataBase: new URL("https://cheyne.dev"), // update this to your actual domain
  openGraph: {
    title: "Onyx's Blog and Project Showcase",
    description: "Onyx Cheyne's blog posts and project showcases, a dive into some things they've made, how they did it and what they thought about the process.",
    url: "https://cheyne.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}