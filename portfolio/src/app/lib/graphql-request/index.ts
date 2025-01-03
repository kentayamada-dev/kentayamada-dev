import { GraphQLClient, gql } from 'graphql-request';
import { env } from '@/constants/env';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type {
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
} from '@/types/contentful';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}`;
const apiClient = new GraphQLClient(endpoint, {
  excludeOperationName: true,
  headers: {
    authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`
  }
});

const getArticleSlugs = async (): Promise<SlugsType> => {
  const query = gql`
    query Query {
      articleCollection {
        items {
          slug
        }
      }
    }
  `;

  const articleSlugs = (await apiClient.request<ArticleSlugsResponseType>(query)).articleCollection.items;

  return articleSlugs;
};

const getUtilitySlugs = async (): Promise<SlugsType> => {
  const query = gql`
    query Query {
      utilityCollection {
        items {
          slug
        }
      }
    }
  `;

  const utilitySlugs = (await apiClient.request<UtilitySlugsResponseType>(query)).utilityCollection.items;

  return utilitySlugs;
};

const getMetadata = async (locale: LocaleKeyType, id: string, onNotFound: () => never): Promise<MetadataType> => {
  const query = gql`
    query MetaDataCollection($where: MetaDataFilter!, $locale: String!) {
      metaDataCollection(where: $where, locale: $locale) {
        items {
          coverImage {
            url
            title
          }
          description
          title
          sys {
            firstPublishedAt
            publishedAt
          }
        }
      }
    }
  `;

  const [metadata] = (
    await apiClient.request<MetadataResponseType>(query, {
      locale,
      where: {
        id
      }
    })
  ).metaDataCollection.items;

  if (!metadata) {
    return onNotFound();
  }

  return metadata;
};

const getArticles = async (locale: LocaleKeyType): Promise<ArticlesType> => {
  const query = gql`
    query Query($locale: String!, $order: [ArticleOrder]!) {
      articleCollection(locale: $locale, order: $order) {
        items {
          title
          slug
          sys {
            publishedAt
          }
          coverImage {
            url
            title
          }
        }
      }
    }
  `;

  const articles = (
    await apiClient.request<ArticlesResponseType>(query, {
      locale,
      order: 'sys_publishedAt_DESC'
    })
  ).articleCollection.items;

  return articles;
};

const getUtilities = async (locale: LocaleKeyType): Promise<UtilitiesType> => {
  const query = gql`
    query UtilityCollection($locale: String!, $order: [UtilityOrder]!) {
      utilityCollection(locale: $locale, order: $order) {
        items {
          title
          slug
          subtitle
          sys {
            publishedAt
          }
          coverImage {
            url
            title
          }
        }
      }
    }
  `;

  const articles = (
    await apiClient.request<UtilitiesResponseType>(query, {
      locale,
      order: 'sys_publishedAt_DESC'
    })
  ).utilityCollection.items;

  return articles;
};

const getArticleBySlug = async (locale: LocaleKeyType, slug: string, onNotFound: () => never): Promise<ArticleType> => {
  const query = gql`
    query Query($where: ArticleFilter!, $locale: String!) {
      articleCollection(where: $where, locale: $locale) {
        items {
          content
          title
          description
          coverImage {
            url
            title
          }
          sys {
            publishedAt
            firstPublishedAt
          }
        }
      }
    }
  `;

  const [article] = (
    await apiClient.request<ArticleResponseType>(query, {
      locale,
      where: {
        slug
      }
    })
  ).articleCollection.items;

  if (!article) {
    return onNotFound();
  }

  return article;
};

const getUtilityBySlug = async (locale: LocaleKeyType, slug: string, onNotFound: () => never): Promise<UtilityType> => {
  const query = gql`
    query Query($where: UtilityFilter, $locale: String) {
      utilityCollection(where: $where, locale: $locale) {
        items {
          content
          title
          subtitle
          coverImage {
            url
            title
          }
          sys {
            publishedAt
            firstPublishedAt
          }
        }
      }
    }
  `;

  const [utility] = (
    await apiClient.request<UtilityResponseType>(query, {
      locale,
      where: {
        slug
      }
    })
  ).utilityCollection.items;

  if (!utility) {
    return onNotFound();
  }

  return utility;
};

const getFaqs = async (locale: LocaleKeyType, idContains: string): Promise<FaqsType> => {
  const query = gql`
    query FaqCollection($locale: String!, $order: [FaqOrder]!, $where: FaqFilter!) {
      faqCollection(locale: $locale, order: $order, where: $where) {
        items {
          answer
          question
        }
      }
    }
  `;

  const articles = (
    await apiClient.request<FaqsResponseType>(query, {
      locale,
      order: 'id_ASC',
      where: {
        // eslint-disable-next-line camelcase
        id_contains: idContains
      }
    })
  ).faqCollection.items;

  return articles;
};

export {
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
  getFaqs,
  getMetadata,
  getUtilities,
  getUtilityBySlug,
  getUtilitySlugs
};
