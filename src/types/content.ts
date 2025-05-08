// types/content.ts

export type Frontmatter = {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
  };
  
  export type PostMeta = Frontmatter & {
    slug: string;
  };
  