import { envServer } from '@/constants/env';
import { arrayOfLocales } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getSitemap } from '@/lib/graphql-request';
import { isDefined } from '@/typeGuards';
import type { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const today = new Date();
  const { articleItems, utilityItems } = await getSitemap();

  const createSitemapEntry = (url: string, publishedAt?: string): MetadataRoute.Sitemap[0] => {
    return {
      lastModified: isDefined(publishedAt) ? publishedAt : today,
      url
    };
  };

  const staticPaths = arrayOfLocales.flatMap((locale) => {
    return Object.values(navigationItems(locale)).map((item) => {
      return createSitemapEntry(`${envServer.SITE_URL}${item.href}`);
    });
  });

  const articlePaths = arrayOfLocales.flatMap((locale) => {
    return articleItems.map((article) => {
      return createSitemapEntry(`${envServer.SITE_URL}${navigationItems(locale).articles.href}/${article.slug}`, article.sys.publishedAt);
    });
  });

  const utilityPaths = arrayOfLocales.flatMap((locale) => {
    return utilityItems.map((utility) => {
      return createSitemapEntry(`${envServer.SITE_URL}${navigationItems(locale).utilities.href}/${utility.slug}`, utility.sys.publishedAt);
    });
  });

  return [...staticPaths, ...articlePaths, ...utilityPaths];
};

export { sitemap as default };
