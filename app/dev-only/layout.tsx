import type { ReactNode } from "react";
import SiteHeader from "@components/general-layout/SiteHeader";
import SiteFooter from "@components/general-layout/SiteFooter";
import { notFound } from 'next/navigation';


export default function Layout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === 'development') return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
  return notFound();
}
