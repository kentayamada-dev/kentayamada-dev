import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { isString } from '@/typeGuards';

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_IS_PRODUCTION: z
      .string()
      .optional()
      .transform((val) => {
        if (isString(val) && val === 'production') {
          return true;
        }

        return false;
      }),
    NEXT_PUBLIC_RECAPTCHA_SITEKEY: z.string()
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_IS_PRODUCTION: process.env['VERCEL_ENV'],
    NEXT_PUBLIC_RECAPTCHA_SITEKEY: process.env['NEXT_PUBLIC_RECAPTCHA_SITEKEY']
  }
});
