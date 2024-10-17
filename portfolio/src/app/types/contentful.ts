/* eslint-disable custom/force-types-in-types-file */

type ArticleResponseType = {
  articleCollection: {
    items: {
      content: string;
      coverImage: {
        url: string;
      };
      description: string;
      sys: {
        firstPublishedAt: string;
        publishedAt: string;
      };
      title: string;
    }[];
  };
};

type ArticlesResponseType = {
  articleCollection: {
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
  articleCollection: {
    items: {
      slug: string;
    }[];
  };
};

/* eslint-enable custom/force-types-in-types-file */

export type { ArticleResponseType, ArticleSlugsResponseType, ArticlesResponseType };
