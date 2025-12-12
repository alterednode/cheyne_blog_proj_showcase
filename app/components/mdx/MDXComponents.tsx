import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";

export const mdxComponents: MDXComponents = {
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
