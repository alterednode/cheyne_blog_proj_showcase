import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";
import InProgress from "../../standard/InProgress";
import { MDXMeter, MDXMeterPlayground } from "./post-specific/this-site/MDXPropDemoCard";
import * as StandardComponents from "@components/standard";
import { ScrollTracker } from "./post-specific/this-site/ScrollTracker";
import Image from "next/image";
import { slugify } from "@lib/content/slug";

function textFromNode(node: unknown): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (node && typeof node === "object" && "props" in node) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return textFromNode((node as any).props?.children);
  }
  return "";
}

function LinkedHeading(
  props: ComponentPropsWithoutRef<"h2"> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    headingClassName?: string;
  }
) {
  const { as = "h2", headingClassName, id, children, ...rest } = props;
  const Tag = as;
  const finalId = id ?? slugify(textFromNode(children));

  return (
    <Tag id={finalId} className={headingClassName} {...rest}>
      <StandardComponents.SmoothScrollLink
        href={`#${finalId}`}
        className="no-underline hover:underline"
      >
        {children}
      </StandardComponents.SmoothScrollLink>
    </Tag>
  );
}

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <LinkedHeading
      as="h1"
      headingClassName="mt-10 scroll-m-20 text-4xl font-bold text-foreground"
      {...props}
    >
      {children}
    </LinkedHeading>
  ),
  h2: ({ children, ...props }) => (
    <LinkedHeading
      as="h2"
      headingClassName="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold text-foreground"
      {...props}
    >
      {children}
    </LinkedHeading>
  ),
  h3: ({ children, ...props }) => (
    <LinkedHeading
      as="h3"
      headingClassName="mt-8 scroll-m-20 text-xl font-semibold text-foreground"
      {...props}
    >
      {children}
    </LinkedHeading>
  ),
  h4: ({ children, ...props }) => (
    <LinkedHeading
      as="h4"
      headingClassName="mt-8 scroll-m-20 text-lg font-semibold text-foreground"
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
      className="text-accent hover:text-primary transition-all hover:scale-50"
      {...props}
    >
      {children}
    </a>
  ),
  Callout,
  InProgress,
  MDXMeter,
  MDXMeterPlayground,
  ScrollTracker,
  Card: StandardComponents.Card,
  Socials: StandardComponents.Socials,
  Image,

};
