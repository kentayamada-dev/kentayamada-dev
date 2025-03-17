import { GraphQLClient } from 'graphql-request';
import { envServer } from '@/constants/env';

const apiClient = new GraphQLClient(`https://graphql.contentful.com/content/v1/spaces/${envServer.CONTENTFUL_SPACE_ID}`, {
  excludeOperationName: true,
  headers: {
    authorization: `Bearer ${envServer.CONTENTFUL_ACCESS_TOKEN}`
  }
});

export const apiRequest = async <T>(query: string, variables: Record<string, unknown> = {}): Promise<T> => {
  return apiClient.request<T>(query, variables);
};
