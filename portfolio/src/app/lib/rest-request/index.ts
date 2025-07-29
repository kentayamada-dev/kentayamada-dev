'use cache';

import { restRequest } from './client';
import { TopicSchema } from './schema';
import type { SlugsType } from '@/types/contentful';

const getTopics = async (): Promise<SlugsType> => {
  const response = await restRequest('contentful');
  const topics = TopicSchema.parse(response);

  const topicSlugs =
    topics.fields
      .find((field) => {
        return field.id === 'topics';
      })
      ?.items?.validations[0]?.in.map((topic) => {
        return { slug: encodeURIComponent(topic) };
      }) ?? [];

  return topicSlugs;
};

export { getTopics };
