const DEFAULT_SITE_URL = "https://cheyne.dev";

export const siteUrl =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  DEFAULT_SITE_URL;

export function absoluteUrl(path: string = "/"): string {
  return new URL(path, siteUrl).toString();
}
