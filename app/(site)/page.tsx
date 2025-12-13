import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import SiteHeader from "@components/general-layout/SiteHeader";
import SiteFooter from "@components/general-layout/SiteFooter";
import { PostCard } from "@components/posts/PostCard";
import { getFeaturedPosts, getPublishedPosts, getRecentPosts, } from "@lib/content/query";
import Socials from "@components/general-layout/Socials";

export const metadata: Metadata = {
  title: "Cheyne — portfolio and journal",
  description:
    "Portfolio, projects, and writing from Cheyne; a blend of engineering, design, and on-going curiosity.",
};

export default function Home() {
  const featuredPosts = getFeaturedPosts().slice(0, 4);
  const recentBlogPosts = getRecentPosts(3, "blog");
  const recentProjectPosts = getRecentPosts(3, "project");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm">
            <div className="flex gap-4 items-start">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border border-border">
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
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Backend Dev</p>
                <h1 className="text-2xl font-semibold">Onyx Cheyne</h1>
                <p className="text-sm text-muted-foreground">Seattle / Kelowna</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              I build thoughtful digital experiences, write about the messy parts of design systems, and
              prototype control surfaces for creative work. When I am not writing, I am sketching systems for my
              next tinkering project.
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
              <Socials
                display="icons"
                platforms={["github", "linkedin", "email"]}
                className="flex-wrap"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-end justify-between gap-4 text-muted-foreground">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  Featured writing
                </p>
                <h2 className="text-2xl font-semibold text-foreground">
                  Selected posts
                </h2>
              </div>
              <Link
                href="/posts"
                className="text-xs font-semibold text-muted-foreground transition hover:text-foreground"
              >
                View all posts
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {featuredPosts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No featured posts yet.</p>
              ) : (
                featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground">What I am thinking about now</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
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
              className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
            >
              Browse archive
            </Link>
          </div>
          {recentBlogPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No posts published yet.</p>
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
              className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
            >
              View code
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {recentProjectPosts.map((project) => (
              <article
                key={project.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>{project.date}</span>
                  <span>{project.stack}</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground">{project.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <Link
                  href={project.live || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
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
