import { envServer } from '@/constants/env';
import { arrayOfLocales } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getSitemap } from '@/lib/graphql-request';
import { isString } from '@/typeGuards';
import type { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { articleItems, utilityItems } = await getSitemap();

  const createSitemapEntry = (url: string, publishedAt?: string): MetadataRoute.Sitemap[0] => {
    return {
      lastModified: isString(publishedAt) ? publishedAt : new Date(),
      url
    };
  };

  const staticPaths = arrayOfLocales.flatMap((lang) => {
    return Object.values(navigationItems).map((item) => {
      return createSitemapEntry(`${envServer.SITE_URL}/${lang}${item.href}`);
    });
  });

  const articlePaths = arrayOfLocales.flatMap((lang) => {
    return articleItems.map((article) => {
      return createSitemapEntry(`${envServer.SITE_URL}/${lang}${navigationItems.articles.href}/${article.slug}`, article.sys.publishedAt);
    });
  });

  const utilityPaths = arrayOfLocales.flatMap((lang) => {
    return utilityItems.map((utility) => {
      return createSitemapEntry(`${envServer.SITE_URL}/${lang}${navigationItems.utilities.href}/${utility.slug}`, utility.sys.publishedAt);
    });
  });

  return [...staticPaths, ...articlePaths, ...utilityPaths];
};

export { sitemap as default };
