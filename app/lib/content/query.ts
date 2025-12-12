import { loadAllPosts } from "./load";
import type { Post } from "./schema";

export function getAllPosts(): Post[] {
  return loadAllPosts();
}

export function getPublishedPosts(): Post[] {
  return loadAllPosts().filter((post) => post.status !== "draft");
}

export function getPostBySlug(slug: string): Post | undefined {
  return loadAllPosts().find((post) => post.slug === slug);
}
