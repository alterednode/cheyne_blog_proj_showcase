import type { Metadata } from "next";
import { getFeaturedPosts } from "@lib/content/query";
import Socials from "@/app/components/standard/Socials";
import { DEFAULT_SOCIAL_LINKS } from "@/app/components/standard/Socials";
import { PostGrid } from "@components/posts/PostGrid";
import { CHexImageFrame } from "../components/custom-icons/c-wrench";
import { siteMeta, siteUrl } from "@/app/lib/site";
import Link from "next/link";
import Image from "next/image";

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
        <section className="grid gap-8 xl:grid-cols-[minmax(0,420px)_1fr] 2xl:grid-cols-[minmax(0,480px)_1fr]">
          <div className="p-6">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left xl:flex-col xl:items-start xl:text-left xl:gap-5">
              <CHexImageFrame
                href="/skiing-headshot-square.png"
                title="Selfie of Onyx Cheyne Wearing Ski Gear on the mountain"
                className="h-48 w-48 shrink-0 lg:h-48 lg:w-48 xl:h-64 xl:w-64 xl:self-center 2xl:h-72 2xl:w-72"
                bgStrokeColor="color-mix(in oklab, var(--secondary) 50%, var(--background) 50%)"
                imageScale={0.88}
                priority
              />

              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground">
                  Software Developer
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
              {/* <p className="font-semibold">
                I&apos;m currently looking for co-op or internship opportunities for Summer 2026, so if you have or know of any, please reach out!
              </p> */}
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

      <div className="mx-auto max-w-4xl px-4">
        {/* Hiding this whole thing until content is ready */}
        <div className="p-6">
          <h3 className="text-lg font-semibold">More About Me</h3>
          <p className="mt-4 text-sm leading-relaxed text-foreground">
            I&apos;m wrapping up my third year at UBCO, and I&apos;m loving it! I&apos;ve had the chance to work on some fun projects, both in school and on my own time, and I&apos;m excited to keep learning and building new things.
            <br />
            I have a wide range of interests, but I&apos;m particularly passionate about back-end development, game development, and hardware projects. I love learning new technologies and improving my skills, and I&apos;m documenting my journey here.
            <br />
            I find I really like working on the inner workings of systems, working with relational databases, optimizing and debugging code, but I do enjoy making things look nice and polished when I can, and really apprciate when others make good UX.
          </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground">
              Outside of coding, I enjoy spending time outdoors, skiing in the tree runs at Big White and Silverstar, though I can&apos;t get up to the mountains as much as I would like these days. Which partially led to me picking up bouldering this year. I also love camping and backpacking, and I hope to explore more of the okanagan this summer. 
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground">
              I also play trombone! I started in elementary school and played through high school, eventually becoming one of the staff members of the <Link className="text-primary" href="https://www.allcityband.org/">Seattle All-City Marching band</Link>, and I continue to play with the <Link className="text-primary" href="https://www.kelownacityband.com/">Kelowna City Concert Band</Link>. It&apos;s a great way to relax and have fun, and I really enjoy the social aspect of playing music with others.
            </p>
        </div>
        
        <div className="p-2">
          <div className="flex flex-wrap gap-6 justify-center">
            
            <figure className="flex flex-col items-center">
              <Image
                src="/IMG_3834.JPG"
                alt="Onyx wearing a 'Band Mom!' Hat"
                className="rounded-lg shadow-md"
                width={116*1.5}
                height={154*1.5}
              />
              <figcaption className="mt-3 text-sm text-muted-foreground text-center">
                A gift from my section!
              </figcaption>
            </figure>

            <figure className="flex flex-col items-center">
              <Image
                src="/IMG_5478-jpg.jpg"
                alt="Headshot of Onyx Cheyne"
                className="rounded-lg shadow-md"
                width={201*1.5 }
                height={201*1.5}
              />
              <figcaption className="mt-3 text-sm text-muted-foreground text-center">
                Revelstoke Mountain
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <Image
                src="/ACB_20240807-Trombones-Baritones.jpg"
                alt="Onyx with their section of trombones and baritones"
                className="rounded-lg shadow-md"
                width={304*1.5}
                height={205*1.5}
              />
              <figcaption className="mt-3 text-sm text-muted-foreground text-center">
                The Bones and Tones from my time as ACB staff, I miss these guys!
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
