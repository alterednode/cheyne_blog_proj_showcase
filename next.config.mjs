import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  async rewrites() {
    return [
      {
        source: '/va/:path*',
        destination: '/_vercel/insights/:path*',
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-frontmatter", ["yaml"]], "remark-gfm"],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          defaultLang: "plaintext",
          theme: "material-theme-darker",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);