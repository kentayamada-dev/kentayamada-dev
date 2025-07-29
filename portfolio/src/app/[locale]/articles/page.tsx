import { ArticleList } from '@/components/designSystem/molecules';
import { contentfulType } from '@/constants/contentful';
import { envServer } from '@/constants/env';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticles, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { getCount } from '@/lib/nextjs/actions';
import { JsonLd } from '@/lib/nextjs/jsonLd';
import { getRedisKey, throwColoredError } from '@/utils';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.articles);

  if (metadata === null) {
    return throwColoredError(`metadata <${contentfulType.metadata.articles}> is empty`, 'red');
  }

  return getMetadataObject(
    'website',
    { current: navigationItems(locale).articles.href, en: navigationItems('en').articles.href, ja: navigationItems('ja').articles.href },
    locale,
    metadata.description,
    metadata.title,
    metadata.coverImage.url,
    new Date(metadata.sys.publishedAt),
    new Date(metadata.sys.firstPublishedAt)
  );
};

const Page: PageType = async (props) => {
  const { locale } = await props.params;

  const {
    articles: { latest: title },
    navigation: { articles: articlesLabel, home: homeLabel }
  } = dictionaries[locale];

  const navigation = navigationItems(locale);

  const articles = await Promise.all(
    (await getArticles(locale)).map(async (article) => {
      const viewCount = await getCount(getRedisKey('article', 'view', article.slug));
      const likeCount = await getCount(getRedisKey('article', 'like', article.slug));

      return {
        createdAt: new Date(article.sys.firstPublishedAt),
        href: `${navigation.articles.href}/${article.slug}`,
        likeCount,
        subtitle: article.subtitle,
        title: article.title,
        topics: article.topics.sort(),
        viewCount
      };
    })
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'item': `${envServer.SITE_URL}${navigation.home.href}`,
        'name': homeLabel,
        'position': 1
      },
      {
        '@type': 'ListItem',
        'name': articlesLabel,
        'position': 2
      }
    ],
    'name': navigation.articles.href
  };

  return (
    <>
      <JsonLd jsonLd={jsonLd} />
      <main className='w-full self-center px-5 py-10 sm:max-w-7xl sm:px-10 sm:py-20'>
        <h1 className='text-primary mb-8 text-3xl font-bold tracking-tight sm:text-4xl'>{title}</h1>
        <ArticleList articles={articles} locale={locale} />
      </main>
    </>
  );
};

export { Page as default, generateMetadata };
