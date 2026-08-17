import type { MetadataRoute } from "next";

import { getPublishedPosts } from "@/app/lib/content/query";
import { absoluteUrl } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/posts"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/timcam"),
      changeFrequency: "hourly",
      priority: 0.8,
    }
  ];

  const postRoutes: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: absoluteUrl(`/posts/${post.slug}`),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
