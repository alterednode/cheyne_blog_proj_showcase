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
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div className="rounded-2xl border-2 p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 shadow-lg">
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
                <p className="text-xs uppercase tracking-[0.3em] font-bold">Developer</p>
                <h1 className="text-2xl font-semibold">Onyx Cheyne</h1>
                <p className="text-sm">
                  <span>Seattle, WA</span><br />
                  <span>Kelowna, BC</span>
                </p>
              </div>
            </div>
            <div className="mt-6 text-sm leading-relaxed max-w-md">
              <p >
                Hi there! I'm Onyx, a Comp Sci student at UBC Okangan. I have a passion for making things, whether that's full-stack appliactions, games, or hardware projects.
              </p>
              <br />
              <p>
                I like learning new technologies and improving my skills, and I'm documenting my journey here.
              </p>
              <br />
              <p>
                Feel free to reach out if you'd like to connect!
              </p>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold">Reach out</p>
              <Socials
                display="icons"
                platforms={["github", "linkedin", "email"]}
                className="flex-wrap"
              />
            </div>
          </div>

          <div className="rounded-2xl border-2 p-6 shadow-lg">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  Featured
                </h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {featuredPosts.length === 0 ? (
                <p className="text-sm">I forgot to feature any posts!!!!.</p>
              ) : (
                featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border-2 p-8 shadow-lg">
          <h3 className="text-lg font-semibold">About Me</h3>
          <p className="mt-4 text-sm leading-relaxed">

          </p>
        </section>
      </main>
    </div>
  );
}
