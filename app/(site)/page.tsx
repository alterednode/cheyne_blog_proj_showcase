import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import SiteHeader from "@components/general-layout/SiteHeader";
import SiteFooter from "@components/general-layout/SiteFooter";
import { PostCard } from "@components/posts/PostCard";
import { getFeaturedPosts, getPublishedPosts, getRecentPosts, } from "@lib/content/query";

export const metadata: Metadata = {
  title: "Cheyne — portfolio and journal",
  description:
    "Portfolio, projects, and writing from Cheyne; a blend of engineering, design, and on-going curiosity.",
};

const socialLinks = [
  { label: "GitHub", href: "https://github.com/alterednode" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Email", href: "mailto:onyx@cheyne.dev" },
];

export default function Home() {
  const featuredPosts = getFeaturedPosts().slice(0, 4);
  const recentBlogPosts = getRecentPosts(3, "blog");
  const recentProjectPosts = getRecentPosts(3, "project");

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111]">
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <div className="flex gap-4 items-start">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border border-slate-200">
                <Image
                  src="/c-wrench/tiny no bkg.png"
                  alt="Placeholder headshot"
                  fill
                  sizes="(max-width: 768px) 8rem, 6rem"
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Backend Dev</p>
                <h1 className="text-2xl font-semibold">Onyx Cheyne</h1>
                <p className="text-sm text-slate-500">Seattle / Kelowna</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              I build thoughtful digital experiences, write about the messy parts of design systems, and
              prototype control surfaces for creative work. When I am not writing, I am sketching systems for my
              next tinkering project.
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Social</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-end justify-between gap-4 text-slate-600">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  Featured writing
                </p>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Selected posts
                </h2>
              </div>
              <Link
                href="/posts"
                className="text-xs font-semibold text-slate-500 transition hover:text-slate-900"
              >
                View all posts
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {featuredPosts.length === 0 ? (
                <p className="text-sm text-slate-500">No featured posts yet.</p>
              ) : (
                featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">What I am thinking about now</h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Designing better digital tools is less about the pixels and more about how the system feels. I spend a
            lot of time sketching process, tooling around with code, and experimenting with frictionless systems.
            This space houses the writing and experiments that help me sharpen that craft.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent posts</h3>
            <Link
              href="/posts"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              Browse archive
            </Link>
          </div>
          {recentBlogPosts.length === 0 ? (
            <p className="text-sm text-slate-500">No posts published yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {recentBlogPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent projects</h3>
            <Link
              href="https://github.com/alterednode"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              View code
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {recentProjectPosts.map((project) => (
              <article
                key={project.title}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                  <span>{project.date}</span>
                  <span>{project.stack}</span>
                </div>
                <h4 className="text-lg font-semibold text-slate-900">{project.title}</h4>
                <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>
                <Link
                  href={project.live || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                >
                  Open project →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
