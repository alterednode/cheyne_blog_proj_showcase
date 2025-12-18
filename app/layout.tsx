import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      </body>
    </html>
  );
}
