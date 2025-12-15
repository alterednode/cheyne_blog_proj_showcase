import Image from "next/image";
import type { Metadata } from "next";
import { getFeaturedPosts, getRecentPosts, } from "@lib/content/query";
import Socials from "@/app/components/standard/Socials";
import { Card } from "@/app/components/standard/Card";
import { PostGrid } from "@components/posts/PostGrid";
import InProgress from "../components/posts/mdx/InProgress";

export const metadata: Metadata = {
  title: "Onyx Cheyne",
  description:
    "Blog and project showcase of Onyx Cheyne, a computer science student at UBC Okanagan.",
};

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const recentBlogPosts = getRecentPosts(3, "blog");
  const recentProjectPosts = getRecentPosts(3, "project");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <InProgress title="Site Under Construction">
        Sorry for the mess! I'm still working on making this look how I want, so bear with me as I hammer things into place.
        <br />
        Additional posts are also on the way!
      </InProgress>
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-border shadow-lg">
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
                <h1 className="text-2xl font-semibold text-primary">Onyx Cheyne</h1>
                <p className="text-sm text-muted-foreground">
                  <span>Seattle, WA</span><br />
                  <span>Kelowna, BC</span>
                </p>
              </div>
            </div>
            <div className="mt-6 text-md leading-relaxed ">
              <p >
                Hi there! I&apos;m Onyx, a Comp Sci student at UBC Okangan. I have a passion for making things, whether that&apos;s full-stack appliactions, games, or hardware projects.
              </p>
              <br />
              <p>
                I like learning new technologies and improving my skills, and I&apos;m documenting my journey here.
              </p>
              <br />
              <p>
                Feel free to contact me if you&apos;d like to connect!
              </p>
            </div>
            <div className="mt-6 space-y-2 bg-accent/10 p-4 rounded-md border-2 border-accent/25">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground">Reach out!</p>
              <Socials
                display="both"
                className="flex-wrap"
              />
            </div>
          </Card>

          <Card className="p-6 h-120 min-h-full overflow-y-auto no-scrollbar">
            <PostGrid
              posts={featuredPosts}
              showHeroImage
              emptyMessage="I forgot to feature any posts!!!!."
            />
          </Card>
        </section>

        <Card className="p-8">
          <h3 className="text-lg font-semibold">About Me</h3>
          <p className="mt-4 text-sm leading-relaxed">

          </p>
        </Card>
      </div>
    </div>
  );
}
