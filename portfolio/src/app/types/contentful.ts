/* eslint-disable custom/force-types-in-types-file */

type UtilityType = {
  content: string;
  coverImage: {
    title: string;
    url: string;
  };
  subtitle: string;
  sys: {
    firstPublishedAt: string;
    publishedAt: string;
  };
  title: string;
};

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

type UtilityResponseType = {
  utilityCollection: {
    items: UtilityType[];
  };
};

type FaqsType = {
  answer: string;
  question: string;
}[];

type ArticlesType = {
  coverImage: {
    title: string;
    url: string;
  };
  slug: string;
  sys: { publishedAt: string };
  title: string;
}[];

type UtilitiesType = {
  coverImage: {
    title: string;
    url: string;
  };
  slug: string;
  subtitle: string;
  sys: { publishedAt: string };
  title: string;
}[];

type FaqsResponseType = {
  faqCollection: {
    items: FaqsType;
  };
};

type ArticlesResponseType = {
  articleCollection: {
    items: ArticlesType;
  };
};

type UtilitiesResponseType = {
  utilityCollection: {
    items: UtilitiesType;
  };
};

type SlugsType = {
  slug: string;
}[];

type ArticleSlugsResponseType = {
  articleCollection: {
    items: SlugsType;
  };
};

type UtilitySlugsResponseType = {
  utilityCollection: {
    items: SlugsType;
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
  ArticleType,
  ArticlesResponseType,
  ArticlesType,
  FaqsResponseType,
  FaqsType,
  MetadataResponseType,
  MetadataType,
  SlugsType,
  UtilitiesResponseType,
  UtilitiesType,
  UtilityResponseType,
  UtilitySlugsResponseType,
  UtilityType
};
