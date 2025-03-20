import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const envServer = createEnv({
  emptyStringAsUndefined: true,
  // eslint-disable-next-line camelcase
  experimental__runtimeEnv: process.env,
  server: {
    CONTENTFUL_ACCESS_TOKEN: z.string(),
    CONTENTFUL_SPACE_ID: z.string(),
    GITHUB_ACCESS_TOKEN: z.string(),
    SITE_URL: z.string()
  }
});
