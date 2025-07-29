import { GraphQLClient } from 'graphql-request';
import { envServer } from '@/constants/env';
import { throwColoredError } from '@/utils';

const API_ENDPOINTS = {
  contentful: `https://graphql.contentful.com/content/v1/spaces/${envServer.CONTENTFUL_SPACE_ID}`,
  github: 'https://api.github.com/graphql'
};

const createApiClient = (api: keyof typeof API_ENDPOINTS): GraphQLClient => {
  return new GraphQLClient(API_ENDPOINTS[api], {
    excludeOperationName: true,
    fetch: async (url, params): Promise<Response> => {
      return fetch(url, { ...params, next: { revalidate: false } });
    },
    headers: {
      authorization: `Bearer ${api === 'contentful' ? envServer.CONTENTFUL_ACCESS_TOKEN : envServer.GITHUB_ACCESS_TOKEN}`
    }
  });
};

export const graphqlRequest = async <T>(api: keyof typeof API_ENDPOINTS, query: string, variables: Record<string, unknown> = {}): Promise<T> => {
  try {
    const client = createApiClient(api);

    return await client.request<T>(query, variables);
  } catch (error) {
    return throwColoredError('GraphQL Request Failed', 'red', JSON.stringify(error, null, 2));
  }
};
