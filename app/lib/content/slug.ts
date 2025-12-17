export function slugify(text: string, fallback = "section"): string {
  const raw = text.toLowerCase().trim();

  const slug = raw
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

export function createSlugger(fallback = "section") {
  const counts = new Map<string, number>();

  return (text: string): string => {
    const base = slugify(text, fallback);

    const count = (counts.get(base) || 0) + 1;
    counts.set(base, count);

    if (count > 1) return `${base}-${count}`;
    return base;
  };
}
