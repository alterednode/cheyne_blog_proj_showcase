import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerNotationFocus, transformerNotationWordHighlight } from "@shikijs/transformers";
import { mdxComponents } from "@/app/components/mdx/MDXComponents";
const options = {
  defaultLang: "plaintext",
  theme: "github-dark-dimmed",
  transformers: [
    transformerNotationFocus(),
    transformerNotationWordHighlight(),
  ],
};

export async function renderMdx(source: string): Promise<React.ReactNode> {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, options]],
      },
    },
  });

  return content;
}
