'use cache';

import { restRequest } from './client';
import { TopicSchema } from './schema';
import type { GetTopicsType } from './types';

const getTopics = async (): Promise<GetTopicsType> => {
  const response = await restRequest('contentful');
  const topics = TopicSchema.parse(response);

  const topicSlugs =
    topics.fields
      .find((field) => {
        return field.id === 'topics';
      })
      ?.items?.validations[0]?.in.map((topic) => {
        return encodeURIComponent(topic);
      }) ?? [];

  return { createdAt: topics.sys.createdAt, slugs: topicSlugs, updatedAt: topics.sys.updatedAt };
};

export { getTopics };
