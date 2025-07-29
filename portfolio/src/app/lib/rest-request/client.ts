import { envServer } from '@/constants/env';
import { throwColoredError } from '@/utils';

const API_ENDPOINTS = {
  contentful: `https://cdn.contentful.com/spaces/${envServer.CONTENTFUL_SPACE_ID}/environments/master/content_types/article`
};

export const restRequest = async (api: keyof typeof API_ENDPOINTS): Promise<unknown> => {
  try {
    const response = await fetch(API_ENDPOINTS[api], {
      headers: {
        Authorization: `Bearer ${envServer.CONTENTFUL_ACCESS_TOKEN}`
      },
      next: {
        revalidate: false
      }
    });

    return await response.json();
  } catch (error) {
    return throwColoredError('Rest Request Failed', 'red', JSON.stringify(error, null, 2));
  }
};
