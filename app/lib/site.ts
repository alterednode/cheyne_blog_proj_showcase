const DEFAULT_SITE_URL = "https://cheyne.dev";

export const siteUrl =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  DEFAULT_SITE_URL;

export const siteMeta = {
  name: "Onyx Cheyne",
  title: "Onyx Cheyne",
  titleTemplate: "%s | Onyx Cheyne",
  homeTitle: "Onyx Cheyne — Software Developer",
  description:
    "Onyx Cheyne — software developer and computer science student at UBC Okanagan. Blog posts and project write-ups.",
  homeDescription:
    "Onyx Cheyne is a software developer and computer science student at UBC Okanagan. Projects, blog posts, and contact info.",
  personDescription:
    "Software developer and computer science student at UBC Okanagan.",
  keywords: [
    "Onyx Cheyne",
    "cheyne.dev",
    "software developer",
    "computer science",
    "UBC Okanagan",
    "UBCO",
    "projects",
    "blog",
  ],
  icon: "/c-wrench/tiny no bkg.png",
  ogImage: "/c-wrench/full no bkg.png",
} as const;

export function absoluteUrl(path: string = "/"): string {
  return new URL(path, siteUrl).toString();
}
