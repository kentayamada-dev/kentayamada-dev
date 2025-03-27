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
    headers: {
      authorization: `Bearer ${api === 'contentful' ? envServer.CONTENTFUL_ACCESS_TOKEN : envServer.GITHUB_ACCESS_TOKEN}`
    }
  });
};

export const apiRequest = async <T>(api: keyof typeof API_ENDPOINTS, query: string, variables: Record<string, unknown> = {}): Promise<T> => {
  const client = createApiClient(api);

  try {
    return await client.request<T>(query, variables);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return throwColoredError('GraphQL Request Failed', 'red', JSON.stringify(error, null, 2));
  }
};
