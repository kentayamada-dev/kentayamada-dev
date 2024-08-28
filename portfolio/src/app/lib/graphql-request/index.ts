import { GraphQLClient } from 'graphql-request';
import { env } from '@/constants/env';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}`;
const apiClient = new GraphQLClient(endpoint, {
  excludeOperationName: true,
  headers: {
    authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`
  }
});

export { apiClient };
