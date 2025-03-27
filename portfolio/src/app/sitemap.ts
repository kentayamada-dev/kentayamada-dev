import { envServer } from '@/constants/env';
import { arrayOfLocales } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getSitemap } from '@/lib/graphql-request';
import { isString } from '@/typeGuards';
import storybook from '../../public/storybook/index.json';
import type { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const today = new Date();
  const { articleItems, utilityItems } = await getSitemap();

  const createSitemapEntry = (url: string, publishedAt?: string): MetadataRoute.Sitemap[0] => {
    return {
      lastModified: isString(publishedAt) ? publishedAt : today,
      url
    };
  };

  const staticPaths = arrayOfLocales.flatMap((locale) => {
    return Object.values(navigationItems).map((item) => {
      return createSitemapEntry(`${envServer.SITE_URL}/${locale}${item.href}`);
    });
  });

  const articlePaths = arrayOfLocales.flatMap((locale) => {
    return articleItems.map((article) => {
      return createSitemapEntry(`${envServer.SITE_URL}/${locale}${navigationItems.articles.href}/${article.slug}`, article.sys.publishedAt);
    });
  });

  const utilityPaths = arrayOfLocales.flatMap((locale) => {
    return utilityItems.map((utility) => {
      return createSitemapEntry(`${envServer.SITE_URL}/${locale}${navigationItems.utilities.href}/${utility.slug}`, utility.sys.publishedAt);
    });
  });

  const storybookPaths = Object.keys(storybook.entries).map((key) => {
    return createSitemapEntry(`${envServer.SITE_URL}/storybook/index.html?path=/story/${key}`);
  });

  return [...staticPaths, ...articlePaths, ...utilityPaths, ...storybookPaths];
};

export { sitemap as default };
