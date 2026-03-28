import type { Metadata } from "next";
import { getFeaturedPosts, getRecentPosts, } from "@lib/content/query";
import Socials from "@/app/components/standard/Socials";
import { DEFAULT_SOCIAL_LINKS } from "@/app/components/standard/Socials";
import { Card } from "@/app/components/standard/Card";
import { PostGrid } from "@components/posts/PostGrid";
import InProgress from "../components/standard/InProgress";
import { CWrenchIconWithBackground } from "../components/custom-icons/c-wrench";
import { siteMeta, siteUrl } from "@/app/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: siteMeta.homeTitle,
  },
  description: siteMeta.homeDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: siteMeta.homeTitle,
    description: siteMeta.homeDescription,
    images: [
      {
        url: siteMeta.ogImage,
        alt: `${siteMeta.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteMeta.homeTitle,
    description: siteMeta.homeDescription,
    images: [siteMeta.ogImage],
  },
};

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const recentBlogPosts = getRecentPosts(3, "blog");
  const recentProjectPosts = getRecentPosts(3, "project");
  const sameAsLinks = Object.values(DEFAULT_SOCIAL_LINKS).filter(
    (link): link is string => Boolean(link) && /^https?:\/\//.test(link)
  );
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMeta.name,
    url: siteUrl,
    description: siteMeta.personDescription,
    jobTitle: "Software Developer",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "University of British Columbia Okanagan",
    },
    sameAs: sameAsLinks,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/*
      <InProgress title="Site Under Construction">
        Sorry for the mess! I&apos;m still working on making this look how I want, so bear with me as I hammer things into place.
        <br />
        Additional posts are also on the way!
        <br />
        As well as a headshot photo...
      </InProgress>
      */}

      <div className="mx-auto max-w-6xl px-4 py-10 space-y-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <CWrenchIconWithBackground
                className="text-muted-foreground relative overflow-hidden w-30"
                bgColor="var(--background)"
                bgStrokeColor="var(--background)"
              />

              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground">
                  Developer
                </p>
                <h1 className="text-2xl font-semibold text-primary">Onyx Cheyne</h1>
                <p className="text-sm text-muted-foreground">
                  <span>Kelowna, BC</span>
                </p>
              </div>
            </div>

            <div className="mt-6 text-sm leading-relaxed text-foreground space-y-4">
              <p>
                Hi there! I&apos;m Onyx, a Computer Science student at UBC Okanagan. I have a passion for making things, whether that&apos;s full-stack applications, games, or hardware projects.
              </p>
              <p>
                I like learning new technologies and improving my skills, and I&apos;m documenting my journey here.
              </p>
              {/* <p>
                Feel free to contact me if you&apos;d like to connect!
              </p> */}
              <p>
                I&apos;m currently looking for co-op or internship opportunities for Summer 2026, so if you have or know of any, please reach out!
              </p>
            </div>

            {/* Accent callout */}
            <div className="mt-6 rounded-lg border border-accent/35 bg-accent/10 p-4 space-y-2">
              <p className="text-sm uppercase tracking-[0.1em] font-semibold text-foreground">
                Reach out!
              </p>
              <Socials display="both" className="flex-wrap" />
            </div>
          </div>


          <div className="min-h-full overflow-y-auto no-scrollbar">
            <h2 className="text-3xl font-semibold mb-6">Featured Posts</h2>
            <PostGrid
              posts={featuredPosts}
              showHeroImage
              emptyMessage="I forgot to feature any posts!!!!."
            />
          </div>
        </section>


       
      </div>
      
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-12">
              {/* Hiding this whole thing until content is ready */}
        <div className="p-6">
          <h3 className="text-lg font-semibold">About Me</h3>
          <p className="mt-4 text-sm leading-relaxed text-foreground">
            I&apos;m a computer science student at the University of British Columbia&apos;s Okanagan campus, wrapping up my third year.
            <br />
            I have a wide range of interests, but I&apos;m particularly passionate about software development, game development, and hardware projects. I love learning new technologies and improving my skills, and I&apos;m documenting my journey here.
            <br />
            I find I really like working on the inner workings of systems, , but I do enjoy making things look nice and polished when I can, and really apprciate good UX.
          </p>
        </div>
        </div>
    </div>
  );
}
