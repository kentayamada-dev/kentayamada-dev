'use cache';

import { gql } from 'graphql-tag';
import { restRequest } from './client';
import {
  AboutSchema,
  ArticleSlugSchema,
  ArticleSlugsSchema,
  ArticlesSchema,
  ArticlesTopicSchema,
  ContactSchema,
  FaqsSchema,
  MetadataSchema,
  ProjectsInfoSchema,
  SitemapSchema,
  TopicSchema,
  UtilitiesSchema,
  UtilitySlugSchema
} from './schema';
import type {
  GetAboutType,
  GetArticleBySlugType,
  GetArticleSlugsType,
  GetArticlesByTopicType,
  GetArticlesType,
  GetContactType,
  GetFaqsType,
  GetMetadataType,
  GetProjectsType,
  GetSitemapType,
  GetTopicType,
  GetUtilitiesType,
  GetUtilityBySlugType,
  ProjectsType
} from './types';

const getProjects: GetProjectsType = async () => {
  let pinnedRepos: ProjectsType = [];
  let cursor: string | null = null;

  const query = gql`
    query Query($username: String!, $cursor: String) {
      user(login: $username) {
        pinnedItems(first: 10, types: REPOSITORY, after: $cursor) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  `;

  do {
    const projects = ProjectsInfoSchema.parse(
      // eslint-disable-next-line no-await-in-loop
      await restRequest('github', {
        query,
        variables: {
          cursor,
          username: 'kentayamada-dev'
        }
      })
    );

    pinnedRepos = [...pinnedRepos, ...projects.nodes];

    cursor = projects.pageInfo.hasNextPage ? projects.pageInfo.endCursor : null;
  } while (cursor !== null);

  return pinnedRepos;
};

const getSitemap: GetSitemapType = async () => {
  const query = gql`
    query Query {
      articleCollection {
        items {
          slug
          sys {
            publishedAt
          }
        }
      }
      utilityCollection {
        items {
          slug
          sys {
            publishedAt
          }
        }
      }
    }
  `;

  const sitemap = SitemapSchema.parse(await restRequest('contentful-gql', { query }));

  return sitemap;
};

const getArticleSlugs: GetArticleSlugsType = async () => {
  const query = gql`
    query Query {
      articleCollection {
        items {
          slug
        }
      }
    }
  `;

  const articleSlugs = ArticleSlugsSchema.parse(await restRequest('contentful-gql', { query }));

  return articleSlugs;
};

const getMetadata: GetMetadataType = async (locale, id) => {
  const query = gql`
    query Query($where: MetaDataFilter!, $locale: String!) {
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

  const metadata = MetadataSchema.parse(
    await restRequest('contentful-gql', {
      query,
      variables: {
        locale,
        where: {
          id
        }
      }
    })
  );

  return metadata;
};

const getArticles: GetArticlesType = async (locale, limit) => {
  const query = gql`
    query Query($locale: String!, $order: [ArticleOrder]!, $limit: Int!) {
      articleCollection(locale: $locale, order: $order, limit: $limit) {
        items {
          title
          slug
          subtitle
          topics
          sys {
            publishedAt
            firstPublishedAt
          }
        }
      }
    }
  `;

  const articles = ArticlesSchema.parse(
    await restRequest('contentful-gql', { query, variables: { limit: limit ?? 100, locale, order: 'sys_firstPublishedAt_DESC' } })
  );

  return articles;
};

const getContact: GetContactType = async (locale) => {
  const query = gql`
    query Query($locale: String!) {
      contactCollection(locale: $locale) {
        items {
          title
          subtitle
        }
      }
    }
  `;

  const contact = ContactSchema.parse(await restRequest('contentful-gql', { query, variables: { locale } }));

  return contact;
};

const getUtilities: GetUtilitiesType = async (locale) => {
  const query = gql`
    query Query($locale: String!, $order: [UtilityOrder]!) {
      utilityCollection(locale: $locale, order: $order) {
        items {
          title
          slug
          subtitle
        }
      }
    }
  `;

  const utilities = UtilitiesSchema.parse(await restRequest('contentful-gql', { query, variables: { locale, order: 'sys_publishedAt_DESC' } }));

  return utilities;
};

const getAbout: GetAboutType = async (locale) => {
  const query = gql`
    query Query($locale: String!) {
      aboutCollection(locale: $locale) {
        items {
          coverImage {
            title
            url
          }
          title
          subtitle
          paragraph
        }
      }
    }
  `;

  const about = AboutSchema.parse(await restRequest('contentful-gql', { query, variables: { locale } }));

  return about;
};

const getArticleBySlug: GetArticleBySlugType = async (locale, slug) => {
  const query = gql`
    query Query($where: ArticleFilter!, $locale: String!) {
      articleCollection(where: $where, locale: $locale) {
        items {
          content
          title
          subtitle
          topics
          sys {
            publishedAt
            firstPublishedAt
          }
        }
      }
    }
  `;

  const article = ArticleSlugSchema.parse(
    await restRequest('contentful-gql', {
      query,
      variables: {
        locale,
        where: {
          slug
        }
      }
    })
  );

  return article;
};

const getArticlesByTopic: GetArticlesByTopicType = async (locale, topic) => {
  const query = gql`
    query Query($locale: String!, $order: [ArticleOrder]!, $where: ArticleFilter!) {
      articleCollection(locale: $locale, order: $order, where: $where) {
        items {
          title
          slug
          subtitle
          topics
          sys {
            publishedAt
            firstPublishedAt
          }
        }
      }
    }
  `;

  const articles = ArticlesTopicSchema.parse(
    await restRequest('contentful-gql', {
      query,
      variables: {
        locale,
        order: 'sys_firstPublishedAt_DESC',
        where: {
          // eslint-disable-next-line camelcase
          topics_contains_all: [topic]
        }
      }
    })
  );

  return articles;
};

const getUtilityBySlug: GetUtilityBySlugType = async (locale, slug) => {
  const query = gql`
    query Query($where: UtilityFilter, $locale: String) {
      utilityCollection(where: $where, locale: $locale) {
        items {
          title
        }
      }
    }
  `;

  const utility = UtilitySlugSchema.parse(
    await restRequest('contentful-gql', {
      query,
      variables: {
        locale,
        where: {
          slug
        }
      }
    })
  );

  return utility;
};

const getFaqs: GetFaqsType = async (locale, id) => {
  const query = gql`
    query Query($locale: String!, $order: [FaqOrder]!, $where: FaqFilter!) {
      faqCollection(locale: $locale, order: $order, where: $where) {
        items {
          answer
          question
        }
      }
    }
  `;

  const faqs = FaqsSchema.parse(
    await restRequest('contentful-gql', {
      query,
      variables: {
        locale,
        order: 'id_ASC',
        where: {
          // eslint-disable-next-line camelcase
          id_contains: id
        }
      }
    })
  );

  return faqs;
};

const getTopic: GetTopicType = async () => {
  const topic = TopicSchema.parse(await restRequest('contentful-rest'));

  return topic;
};

export {
  getAbout,
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
  getArticlesByTopic,
  getContact,
  getFaqs,
  getMetadata,
  getProjects,
  getSitemap,
  getTopic,
  getUtilities,
  getUtilityBySlug
};
