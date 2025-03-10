import { GraphQLClient } from 'graphql-request';
import { env } from '@/constants/env';

const apiClient = new GraphQLClient(`https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}`, {
  excludeOperationName: true,
  headers: {
    authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`
  }
});

export const apiRequest = async <T>(query: string, variables: Record<string, unknown> = {}): Promise<T> => {
  return apiClient.request<T>(query, variables);
};
