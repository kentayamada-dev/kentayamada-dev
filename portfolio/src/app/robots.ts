import { envServer } from './constants/env/server';
import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      allow: '/',
      userAgent: '*'
    },
    sitemap: `${envServer.SITE_URL}/sitemap.xml`
  };
};

export { robots as default };
