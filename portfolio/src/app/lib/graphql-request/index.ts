import { GraphQLClient, gql } from 'graphql-request';
import { env } from '@/constants/env';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ArticleResponseType, ArticleSlugsResponseType, ArticlesResponseType } from '@/types/contentful';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}`;
const apiClient = new GraphQLClient(endpoint, {
  excludeOperationName: true,
  headers: {
    authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`
  }
});

const getArticleSlugs = async (): Promise<ArticleSlugsResponseType> => {
  const query = gql`
    query Query {
      articleCollection {
        items {
          slug
        }
      }
    }
  `;

  return apiClient.request<ArticleSlugsResponseType>(query);
};

const getArticles = async (locale: LocaleKeyType, order: string): Promise<ArticlesResponseType> => {
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

  return apiClient.request<ArticlesResponseType>(query, {
    locale,
    order
  });
};

const getArticleBySlug = async (locale: LocaleKeyType, slug: string): Promise<ArticleResponseType> => {
  const query = gql`
    query Query($where: ArticleFilter!, $locale: String!) {
      articleCollection(where: $where, locale: $locale) {
        items {
          content
          title
          description
          sys {
            publishedAt
          }
        }
      }
    }
  `;

  return apiClient.request<ArticleResponseType>(query, {
    locale,
    where: {
      slug
    }
  });
};

export { getArticleBySlug, getArticleSlugs, getArticles };
