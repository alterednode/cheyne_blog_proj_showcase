import { NextResponse } from "next/server";
import { Feed } from "feed";
import { getPublishedPosts } from "@lib/content/query";
import { absoluteUrl, siteUrl } from "@lib/site";

// as of dec 29 2025, this is intended to be fully static and does not use any dynamic params
// but is not strictly set to that in case I make something dynamic later, I don't want to break anything

export async function GET() {
  const posts = getPublishedPosts();

  const feedUrl = absoluteUrl("/rss.xml");
  const siteIcon = absoluteUrl("/c-wrench/tiny no bkg.png");
  const siteImage = absoluteUrl("/c-wrench/full no bkg.png");
  const author = { name: "Onyx Cheyne", email: "onyx@cheyne.dev" };

  const feed = new Feed({
    id: siteUrl,
    title: "Onyx Cheyne",
    description:
      "Blog and project showcase of Onyx Cheyne, a computer science student at UBC Okanagan.",
    language: "en",
    link: siteUrl,
    feedLinks: {
      rss: feedUrl,
      rss2: feedUrl,
    },
    author,
    image: siteImage,
    favicon: siteIcon,
    updated:
      posts.length > 0
        ? new Date(posts[0].updated ?? posts[0].date)
        : undefined,
    copyright: `Content © ${new Date().getFullYear()} Onyx Cheyne — CC BY-NC 4.0 (https://github.com/alterednode/cheyne_blog_proj_showcase/blob/main/CONTENT_LICENSE.md)`,
  });

  feed.addContributor(author);

  posts.forEach((post) => {
    const url = absoluteUrl(`/posts/${post.slug}`);

    feed.addItem({
      link: url,
      title: post.title,
      description: post.description + ` <strong><a href="${url}">Read More ↗</a></strong>`,
      author: [author],
      date: new Date(post.date),
      ...(post.updated && { updated: new Date(post.updated) }),
      category: post.tags?.map((tag) => ({ name: tag })),
    });
  });

  return new NextResponse(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
