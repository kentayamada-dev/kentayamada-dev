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
    GOOGLE_CLIENT_EMAIL: z.string(),
    GOOGLE_PRIVATE_KEY: z.string(),
    RECAPTCHA_SECRETKEY: z.string(),
    REDIS_URL: z.string(),
    RESEND_API_KEY: z.string(),
    SITE_URL: z.string()
  }
});
