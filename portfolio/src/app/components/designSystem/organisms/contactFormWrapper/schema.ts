import { z } from 'zod';

const siteVerifySchema = z.object({
  // eslint-disable-next-line camelcase
  challenge_ts: z.string(),
  hostname: z.string(),
  success: z.boolean()
});

export { siteVerifySchema };
