import { loadAllPosts } from "./load";
import type { Post } from "./schema";

export function getAllPosts(): Post[] {
  return loadAllPosts();
}

export function getPublishedPosts(type?: string): Post[] {
  let posts = loadAllPosts().filter((post) => post.status !== "draft");
  if (type) {
    posts = posts.filter((post) => post.type === type);
  }
  return posts;
}

export function getRecentPosts(count: number = 3, type?: string): Post[] {
  let posts = getPublishedPosts(type);
  if (count === -1){
    count = posts.length;
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, count);
}

export function getPostBySlug(slug: string): Post | undefined {
  return loadAllPosts().find((post) => post.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return getPublishedPosts()
    .filter((post) => typeof post.featured === "number")
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
}