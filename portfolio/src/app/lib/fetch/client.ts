import { envServer } from '@/constants/env/server';
import { throwColoredError } from '@/utils/throwColoredError';
import type { gql } from 'graphql-tag';

const API_ENDPOINTS = {
  'contentful-gql': {
    headers: {
      'Authorization': `Bearer ${envServer.CONTENTFUL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    url: `https://graphql.contentful.com/content/v1/spaces/${envServer.CONTENTFUL_SPACE_ID}`
  },
  'contentful-rest': {
    headers: {
      'Authorization': `Bearer ${envServer.CONTENTFUL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    method: 'GET',
    url: `https://cdn.contentful.com/spaces/${envServer.CONTENTFUL_SPACE_ID}/environments/master/content_types/article`
  },
  'github': {
    headers: {
      'Authorization': `Bearer ${envServer.GITHUB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    url: 'https://api.github.com/graphql'
  }
} as const;

type GqlType = {
  query: ReturnType<typeof gql>;
  variables: Record<string, unknown>;
};

export const restRequest = async (api: keyof typeof API_ENDPOINTS, body?: Partial<GqlType>): Promise<unknown> => {
  const endpoint = API_ENDPOINTS[api];

  /* eslint-disable @stylistic/multiline-ternary, @stylistic/indent */
  const bodyObj = body
    ? JSON.stringify({
        query: body.query?.loc?.source.body,
        variables: body.variables
      })
    : null;
  /* eslint-enable @stylistic/multiline-ternary, @stylistic/indent */

  try {
    const response = await fetch(endpoint.url, {
      body: bodyObj,
      headers: endpoint.headers,
      method: endpoint.method,
      next: {
        revalidate: false
      }
    });

    return await response.json();
  } catch (error) {
    return throwColoredError('Rest Request Failed', 'red', JSON.stringify(error, null, 2));
  }
};
