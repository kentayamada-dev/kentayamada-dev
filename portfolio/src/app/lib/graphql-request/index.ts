import { GraphQLClient, gql } from 'graphql-request';
import { env } from '@/constants/env';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type {
  ArticleResponseType,
  ArticleSlugsResponseType,
  ArticleSlugsType,
  ArticleType,
  ArticlesResponseType,
  ArticlesType,
  MetadataResponseType,
  MetadataType
} from '@/types/contentful';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}`;
const apiClient = new GraphQLClient(endpoint, {
  excludeOperationName: true,
  headers: {
    authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`
  }
});

const getArticleSlugs = async (): Promise<ArticleSlugsType> => {
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

const getArticles = async (locale: LocaleKeyType, order: string): Promise<ArticlesType> => {
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
      order
    })
  ).articleCollection.items;

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

export { getArticleBySlug, getArticleSlugs, getArticles, getMetadata };
