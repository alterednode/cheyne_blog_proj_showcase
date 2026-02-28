import type { MDXComponents } from "mdx/types";
import { mdxComponents as baseComponents } from "./app/components/posts/mdx/MDXComponents";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...baseComponents,
    ...components,
  };
}
