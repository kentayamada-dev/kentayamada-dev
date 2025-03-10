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

type AboutType = {
  coverImage: {
    title: string;
    url: string;
  };
  subtitle: string;
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

type CareersType = {
  endDate: string;
  logo: {
    title: string;
    url: string;
  };
  organization: string;
  role: string;
  startDate: string;
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

type CareersResponseType = {
  careerCollection: {
    items: CareersType;
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

export type {
  AboutResponseType,
  AboutType,
  ArticleResponseType,
  ArticleSlugsResponseType,
  ArticleType,
  ArticlesResponseType,
  ArticlesType,
  CareersResponseType,
  CareersType,
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
