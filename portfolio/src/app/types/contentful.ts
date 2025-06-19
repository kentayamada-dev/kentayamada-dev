type UtilityType = {
  title: string;
};

type AboutType = {
  coverImage: {
    title: string;
    url: string;
  };
  paragraph: string;
  subtitle: string;
  title: string;
};

type ArticleType = {
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
  topics: string[];
};

type AboutResponseType = {
  aboutCollection: {
    items: AboutType[];
  };
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
  slug: string;
  subtitle: string;
  sys: { firstPublishedAt: string; publishedAt: string };
  title: string;
  topics: string[];
}[];

type UtilitiesType = {
  slug: string;
  subtitle: string;
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

type SitemapItemsType = {
  slug: string;
  sys: { publishedAt: string };
}[];

type ProjectItemsType = {
  createdAt: string;
  description: string;
  forkCount: string;
  name: string;
  stargazerCount: string;
  updatedAt: string;
  url: string;
}[];

type ArticleSlugsResponseType = {
  articleCollection: {
    items: SlugsType;
  };
};

type SitemapResponseType = {
  articleCollection: {
    items: SitemapItemsType;
  };
  utilityCollection: {
    items: SitemapItemsType;
  };
};

type ProjectPinnedItemsType = {
  nodes: ProjectItemsType;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
};

type ProjectResponseType = {
  user: {
    pinnedItems: ProjectPinnedItemsType;
  };
};

type SitemapType = {
  articleItems: SitemapItemsType;
  utilityItems: SitemapItemsType;
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

type ContactType = {
  subtitle: string;
  title: string;
};

type ContactResponseType = {
  contactCollection: {
    items: ContactType[];
  };
};

export type {
  AboutResponseType,
  AboutType,
  ArticleResponseType,
  ArticleSlugsResponseType,
  ArticleType,
  ArticlesResponseType,
  ArticlesType,
  ContactResponseType,
  ContactType,
  FaqsResponseType,
  FaqsType,
  MetadataResponseType,
  MetadataType,
  ProjectItemsType,
  ProjectPinnedItemsType,
  ProjectResponseType,
  SitemapResponseType,
  SitemapType,
  SlugsType,
  UtilitiesResponseType,
  UtilitiesType,
  UtilityResponseType,
  UtilityType
};
