import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";

function textFromNode(node: unknown): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (node && typeof node === "object" && "props" in node) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return textFromNode((node as any).props?.children);
  }
  return "";
}

function slugifyHeading(children: unknown): string {
  const raw = textFromNode(children)
    .toLowerCase()
    .trim();

  const slug = raw
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "section";
}

function LinkedHeading(
  props: React.ComponentPropsWithoutRef<"h2"> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    headingClassName?: string;
  }
) {
  const { as = "h2", headingClassName, id, children, ...rest } = props;
  const Tag = as;
  const finalId = id ?? slugifyHeading(children);

  return (
    <Tag id={finalId} className={headingClassName} {...rest}>
      <a href={`#${finalId}`} className="no-underline hover:underline">
        {children}
      </a>
    </Tag>
  );
}

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <LinkedHeading
      as="h1"
      headingClassName="mt-10 scroll-m-20 text-4xl font-bold tracking-tight"
      {...props}
    >
      {children}
    </LinkedHeading>
  ),
  h2: ({ children, ...props }) => (
    <LinkedHeading
      as="h2"
      headingClassName="mt-10 scroll-m-20 border-b border-gray-200 pb-2 text-2xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </LinkedHeading>
  ),
  h3: ({ children, ...props }) => (
    <LinkedHeading
      as="h3"
      headingClassName="mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </LinkedHeading>
  ),
  h4: ({ children, ...props }) => (
    <LinkedHeading
      as="h4"
      headingClassName="mt-8 scroll-m-20 text-lg font-semibold tracking-tight"
      {...props}
    >
      {children}
    </LinkedHeading>
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
      {...props}
    >
      {children}
    </a>
  ),
  Callout,
};
