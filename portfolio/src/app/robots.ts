import { envServer } from '@/constants/env';
import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      disallow: '/',
      userAgent: '*'
    },
    sitemap: `${envServer.SITE_URL}/sitemap.xml`
  };
};

export { robots as default };
