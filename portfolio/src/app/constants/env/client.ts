import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { isString } from '@/typeGuards';

const { NEXT_PUBLIC_VERCEL_ENV, NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL } = process.env;

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_IS_PRODUCTION: z
      .boolean()
      .optional()
      .transform(() => {
        if (isString(NEXT_PUBLIC_VERCEL_ENV) && NEXT_PUBLIC_VERCEL_ENV === 'production') {
          return true;
        }

        return false;
      })
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_IS_PRODUCTION: NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  }
});
