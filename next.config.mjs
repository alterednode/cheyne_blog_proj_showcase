import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    // Turbopack requires plugins/options to be serializable.
    // Use plugin names (strings) instead of importing functions.
    remarkPlugins: [["remark-frontmatter", ["yaml"]]],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          defaultLang: "plaintext",
          theme: "github-dark-dimmed",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
