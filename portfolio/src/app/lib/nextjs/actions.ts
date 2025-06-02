'use server';

import { createClient } from 'redis';
import { envServer } from '@/constants/env';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const newRedisClient = async () => {
  const client = await createClient({
    url: envServer.REDIS_URL
  }).connect();

  return client;
};

const incrementPageView = async (slug: string): Promise<void> => {
  const client = await newRedisClient();

  await client.incr(slug);

  await client.quit();
};

const getPageViews = async (slug: string): Promise<number> => {
  const client = await newRedisClient();
  const views = Number(await client.get(slug));

  await client.quit();

  return views;
};

export { getPageViews, incrementPageView };
