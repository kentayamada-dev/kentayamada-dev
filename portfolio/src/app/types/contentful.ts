/* eslint-disable custom/force-types-in-types-file */

type ArticleType = {
  content: string;
  coverImage: {
    title: string;
    url: string;
  };
  description: string;
  sys: {
    firstPublishedAt: string;
    publishedAt: string;
  };
  title: string;
};

type ArticleResponseType = {
  articleCollection: {
    items: ArticleType[];
  };
};

type ArticlesType = {
  coverImage: {
    title: string;
    url: string;
  };
  slug: string;
  sys: { publishedAt: string };
  title: string;
}[];

type ArticlesResponseType = {
  articleCollection: {
    items: ArticlesType;
  };
};

type ArticleSlugsType = {
  slug: string;
}[];

type ArticleSlugsResponseType = {
  articleCollection: {
    items: ArticleSlugsType;
  };
};

type MetadataType = {
  coverImage: {
    title: string;
    url: string;
  };
  description: string;
  sys: {
    firstPublishedAt: string;
    publishedAt: string;
  };
  title: string;
};

type MetadataResponseType = {
  metaDataCollection: {
    items: MetadataType[];
  };
};

/* eslint-enable custom/force-types-in-types-file */

export type {
  ArticleResponseType,
  ArticleSlugsResponseType,
  ArticleSlugsType,
  ArticleType,
  ArticlesResponseType,
  ArticlesType,
  MetadataResponseType,
  MetadataType
};
