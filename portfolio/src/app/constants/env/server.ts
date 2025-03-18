import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { isString } from '@/typeGuards';

const { VERCEL_ENV, VERCEL_PROJECT_PRODUCTION_URL } = process.env;

export const envServer = createEnv({
  emptyStringAsUndefined: true,
  // eslint-disable-next-line camelcase
  experimental__runtimeEnv: process.env,
  server: {
    CONTENTFUL_ACCESS_TOKEN: z.string(),
    CONTENTFUL_SPACE_ID: z.string(),
    IS_PRODUCTION: z
      .boolean()
      .optional()
      .transform(() => {
        if (isString(VERCEL_ENV) && VERCEL_ENV === 'production') {
          return true;
        }

        return false;
      }),
    SITE_URL: z
      .string()
      .optional()
      .transform((val) => {
        // eslint-disable-next-line no-console
        console.log('🍣🍣🍣', VERCEL_PROJECT_PRODUCTION_URL, VERCEL_ENV);

        if (isString(VERCEL_PROJECT_PRODUCTION_URL) && isString(VERCEL_ENV) && VERCEL_ENV === 'production') {
          return `https://${val}`;
        }

        return 'http://localhost:3001';
      })
  }
});
