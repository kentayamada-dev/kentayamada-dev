import { gql } from 'graphql-request';
import { apiRequest } from './client';
import type {
  AboutResponseType,
  ArticleResponseType,
  ArticleSlugsResponseType,
  ArticlesResponseType,
  ContactResponseType,
  FaqsResponseType,
  MetadataResponseType,
  ProjectItemsType,
  ProjectPinnedItemsType,
  ProjectResponseType,
  SitemapResponseType,
  UtilitiesResponseType,
  UtilityResponseType,
  UtilitySlugsResponseType
} from '@/types/contentful';
import type {
  GetAboutType,
  GetArticleBySlugType,
  GetArticlesType,
  GetContactType,
  GetFaqsType,
  GetMetadataType,
  GetProjectsType,
  GetSitemapType,
  GetSlugsType,
  GetUtilitiesType,
  GetUtilityBySlugType
} from './types';

const getProjects: GetProjectsType = async () => {
  let pinnedRepos: ProjectItemsType = [];
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
    // eslint-disable-next-line no-await-in-loop
    const userData: ProjectPinnedItemsType = (await apiRequest<ProjectResponseType>('github', query, { cursor, username: 'kentayamada-dev' })).user
      .pinnedItems;

    pinnedRepos = [...pinnedRepos, ...userData.nodes];

    cursor = userData.pageInfo.hasNextPage ? userData.pageInfo.endCursor : null;
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

  const articleItems = (await apiRequest<SitemapResponseType>('contentful', query)).articleCollection.items;
  const utilityItems = (await apiRequest<SitemapResponseType>('contentful', query)).utilityCollection.items;

  return { articleItems, utilityItems };
};

const getArticleSlugs: GetSlugsType = async () => {
  const query = gql`
    query Query {
      articleCollection {
        items {
          slug
        }
      }
    }
  `;

  const articleSlugs = (await apiRequest<ArticleSlugsResponseType>('contentful', query)).articleCollection.items;

  return articleSlugs;
};

const getUtilitySlugs: GetSlugsType = async () => {
  const query = gql`
    query Query {
      utilityCollection {
        items {
          slug
        }
      }
    }
  `;

  const utilitySlugs = (await apiRequest<UtilitySlugsResponseType>('contentful', query)).utilityCollection.items;

  return utilitySlugs;
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

  const [metadata] = (
    await apiRequest<MetadataResponseType>('contentful', query, {
      locale,
      where: {
        id
      }
    })
  ).metaDataCollection.items;

  if (!metadata) {
    return null;
  }

  return metadata;
};

const getArticles: GetArticlesType = async (locale) => {
  const query = gql`
    query Query($locale: String!, $order: [ArticleOrder]!) {
      articleCollection(locale: $locale, order: $order) {
        items {
          title
          slug
          sys {
            publishedAt
            firstPublishedAt
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
    await apiRequest<ArticlesResponseType>('contentful', query, {
      locale,
      order: 'sys_publishedAt_DESC'
    })
  ).articleCollection.items;

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

  const [contact] = (
    await apiRequest<ContactResponseType>('contentful', query, {
      locale
    })
  ).contactCollection.items;

  if (!contact) {
    return null;
  }

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
    await apiRequest<UtilitiesResponseType>('contentful', query, {
      locale,
      order: 'sys_publishedAt_DESC'
    })
  ).utilityCollection.items;

  return articles;
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

  const [about] = (
    await apiRequest<AboutResponseType>('contentful', query, {
      locale
    })
  ).aboutCollection.items;

  if (!about) {
    return null;
  }

  return about;
};

const getArticleBySlug: GetArticleBySlugType = async (locale, slug) => {
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
    await apiRequest<ArticleResponseType>('contentful', query, {
      locale,
      where: {
        slug
      }
    })
  ).articleCollection.items;

  if (!article) {
    return null;
  }

  return article;
};

const getUtilityBySlug: GetUtilityBySlugType = async (locale, slug) => {
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
    await apiRequest<UtilityResponseType>('contentful', query, {
      locale,
      where: {
        slug
      }
    })
  ).utilityCollection.items;

  if (!utility) {
    return null;
  }

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

  const articles = (
    await apiRequest<FaqsResponseType>('contentful', query, {
      locale,
      order: 'id_ASC',
      where: {
        // eslint-disable-next-line camelcase
        id_contains: id
      }
    })
  ).faqCollection.items;

  return articles;
};

export {
  getAbout,
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
  getContact,
  getFaqs,
  getMetadata,
  getProjects,
  getSitemap,
  getUtilities,
  getUtilityBySlug,
  getUtilitySlugs
};
