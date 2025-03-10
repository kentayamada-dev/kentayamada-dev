import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import type { DeepReadonlyType } from '@/types/components';

const MIN_LENGTH_REQUIRED = 1;

const processEnv = createEnv({
  runtimeEnv: process.env,
  server: {
    CONTENTFUL_ACCESS_TOKEN: z.string().min(MIN_LENGTH_REQUIRED),
    CONTENTFUL_SPACE_ID: z.string().min(MIN_LENGTH_REQUIRED)
  }
});

const env = {
  ...processEnv,
  IS_VERCEL_ENV: Boolean(Boolean(process.env['NEXT_PUBLIC_VERCEL_ENV']) || Boolean(process.env['VERCEL_ENV']))
} as const satisfies DeepReadonlyType<{
  CONTENTFUL_ACCESS_TOKEN: string;
  CONTENTFUL_SPACE_ID: string;
  IS_VERCEL_ENV: boolean;
}>;

export { env };
