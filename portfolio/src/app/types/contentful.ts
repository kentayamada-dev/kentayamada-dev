/* eslint-disable custom/force-types-in-types-file */

type ArticleResponseType = {
  blogPostCollection: {
    items: {
      content: string;
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
      sys: { firstPublishedAt: string };
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

export type { ArticleResponseType, ArticleSlugsResponseType, ArticlesResponseType };
