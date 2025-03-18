import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { isString } from '@/typeGuards';

const { VERCEL_ENV, VERCEL_PROJECT_PRODUCTION_URL } = process.env;

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_IS_PRODUCTION: z
      .boolean()
      .optional()
      .transform(() => {
        if (isString(VERCEL_ENV) && VERCEL_ENV === 'production') {
          return true;
        }

        return false;
      })
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_IS_PRODUCTION: VERCEL_PROJECT_PRODUCTION_URL
  }
});
