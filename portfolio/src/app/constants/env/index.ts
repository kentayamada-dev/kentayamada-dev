import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const env = createEnv({
  runtimeEnv: process.env,
  server: {
    CONTENTFUL_ACCESS_TOKEN: z.string().min(1),
    CONTENTFUL_SPACE_ID: z.string().min(1)
  }
});

export { env };
