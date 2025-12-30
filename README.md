![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)
![Content License: CC BY-NC 4.0](https://img.shields.io/badge/Content-CC%20BY--NC%204.0-lightgrey.svg)

# Personal Portfolio Site

This site is a place for me to showcase projects I've worked on, write about things that interest me, and mess around with web technologies.

If you want to know more about how I made it, check that out [here](https://cheyne.dev/posts/this-site).

## Forking

I keep an up-to-date version of this repo with none of my posts or media on the `template` branch. (Check out the workflow at `.github/workflows/publish-template.yml` to see how.)

If you've forked this project, the only thing not in a route, page, or component that you should need to update is `app/lib/site.ts`, where I set cheyne.dev as the site URL fallback if the env variables aren't set.

## Deployment and Configuration.

I deploy this via Vercel; any change to the `main` branch triggers a rebuild and deploy.

If you deploy another way, you should be fine to deploy it like a barebones Next.js site.

## Your own content

If you've forked this to make your own portfolio site, posts are made with MDX. To wire new MDX components, add them to the end of `app/components/posts/mdx/MDXComponents.tsx`.

The MDX files use the filename as the slug and require frontmatter. Feel free to look at my posts to see how I use it, and `app/lib/content/schema.ts` to see all the frontmatter options I've added.

## Licensing

- Code in this repository is licensed under the MIT License.
- Written content and media in `/content` and `/public/content` are licensed under
  Creative Commons Attribution–NonCommercial 4.0.
