/* eslint-disable custom/force-types-in-types-file */

type ArticleResponseType = {
  blogPostCollection: {
    items: {
      content: string;
      sys: {
        publishedAt: string;
      };
      title: string;
    }[];
  };
};

type ArticlesResponseType = {
  blogPostCollection: {
    items: {
      coverImage: {
        title: string;
        url: string;
      };
      slug: string;
      sys: { publishedAt: string };
      title: string;
    }[];
  };
};

type ArticleSlugsResponseType = {
  blogPostCollection: {
    items: {
      slug: string;
    }[];
  };
};

/* eslint-enable custom/force-types-in-types-file */

export type { ArticleResponseType, ArticleSlugsResponseType, ArticlesResponseType };
