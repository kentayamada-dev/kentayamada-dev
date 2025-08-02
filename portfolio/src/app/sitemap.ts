import { arrayOfLocales } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { envServer } from './constants/env/server';
import { getSitemap, getTopic } from './lib/fetch';
import { isDefined } from './typeGuards/isDefined';
import type { MetadataRoute } from 'next';

const createSitemapEntry = (url: string, publishedAt?: string): MetadataRoute.Sitemap[0] => {
  const today = new Date();

  return {
    lastModified: isDefined(publishedAt) ? publishedAt : today,
    url
  };
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { articleItems, utilityItems } = await getSitemap();
  const topicInfo = await getTopic();

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

  const topicsPaths = arrayOfLocales.flatMap((locale) => {
    return topicInfo.topic.map((topicItem) => {
      return createSitemapEntry(`${envServer.SITE_URL}${navigationItems(locale).topics.href}/${topicItem}`, topicInfo.updatedAt);
    });
  });

  return [...staticPaths, ...articlePaths, ...utilityPaths, ...topicsPaths];
};

export { sitemap as default };
