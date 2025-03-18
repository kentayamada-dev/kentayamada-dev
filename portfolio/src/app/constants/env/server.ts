import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { isString } from '@/typeGuards';

const { NEXT_PUBLIC_VERCEL_ENV, NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL } = process.env;

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
        if (isString(NEXT_PUBLIC_VERCEL_ENV) && NEXT_PUBLIC_VERCEL_ENV === 'production') {
          return true;
        }

        return false;
      }),
    SITE_URL: z
      .string()
      .optional()
      .transform((val) => {
        // eslint-disable-next-line no-console
        console.log('🍣🍣🍣', NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL, NEXT_PUBLIC_VERCEL_ENV);

        if (isString(NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) && isString(NEXT_PUBLIC_VERCEL_ENV) && NEXT_PUBLIC_VERCEL_ENV === 'production') {
          return `https://${val}`;
        }

        return 'http://localhost:3001';
      })
  }
});
