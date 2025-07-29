import { notFound } from 'next/navigation';
import { ArticleList } from '@/components/designSystem/molecules';
import { HashTagIcon } from '@/components/icons';
import { contentfulType } from '@/constants/contentful';
import { envServer } from '@/constants/env';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticlesByTopic, getMetadata } from '@/lib/graphql-request';
import { OG, getMetadataObject } from '@/lib/nextjs';
import { getCount } from '@/lib/nextjs/actions';
import { JsonLd } from '@/lib/nextjs/jsonLd';
import { getTopics } from '@/lib/rest-request';
import { getRedisKey, throwColoredError } from '@/utils';
import type { TopicGenerateMetadataType, TopicGenerateStaticParamsType, TopicPageType } from '@/types/components';

const generateStaticParams: TopicGenerateStaticParamsType = async () => {
  const topicSlugs = await getTopics();

  return topicSlugs.map((topic) => {
    return {
      topicId: topic.slug
    };
  });
};

const generateMetadata: TopicGenerateMetadataType = async (props) => {
  const { locale, topicId } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.articles);

  if (metadata === null) {
    return throwColoredError(`metadata <${contentfulType.metadata.articles}> is empty`, 'red');
  }

  const topicPath = `${navigationItems(locale).topics.href}/${topicId}`;

  return getMetadataObject(
    'website',
    {
      current: topicPath,
      en: `${navigationItems('en').topics.href}/${topicId}`,
      ja: `${navigationItems('ja').topics.href}/${topicId}`
    },
    locale,
    metadata.description,
    metadata.title,
    `${topicPath}${OG.PATH}`,
    new Date(metadata.sys.publishedAt),
    new Date(metadata.sys.firstPublishedAt)
  );
};

const Page: TopicPageType = async (props) => {
  const { locale, topicId } = await props.params;
  const topic = decodeURIComponent(topicId);
  const articlesByTopic = await getArticlesByTopic(locale, topic);

  if (!articlesByTopic) {
    return notFound();
  }

  const navigation = navigationItems(locale);
  const { articles: articlesLabel, home: homeLabel, topics: topicsLabel } = dictionaries[locale].navigation;

  const articles = await Promise.all(
    articlesByTopic.map(async (article) => {
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
        'item': `${envServer.SITE_URL}${navigation.topics.href}`,
        'name': topicsLabel,
        'position': 2
      },
      {
        '@type': 'ListItem',
        'name': topic,
        'position': 3
      }
    ],
    'name': `${navigation.topics.href}/${topicId}`
  };

  return (
    <>
      <JsonLd jsonLd={jsonLd} />
      <main className='flex w-full flex-col'>
        <header
          // https://app.haikei.app/
          // eslint-disable-next-line better-tailwindcss/enforce-consistent-line-wrapping
          className='relative flex justify-center overflow-hidden before:absolute before:start-1/2 before:top-1/2 before:-z-1 before:size-full before:-translate-1/2 before:transform before:bg-[url("data:image/svg+xml;base64,PHN2ZyBpZD0idmlzdWFsIiB2aWV3Qm94PSIwIDAgOTAwIDQ1MCIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI0NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSI+PGRlZnM+PGZpbHRlciBpZD0iYmx1cjEiIHg9Ii0xMCUiIHk9Ii0xMCUiIHdpZHRoPSIxMjAlIiBoZWlnaHQ9IjEyMCUiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ij48L2ZlRmxvb2Q+PGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiPjwvZmVCbGVuZD48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxNDkiIHJlc3VsdD0iZWZmZWN0MV9mb3JlZ3JvdW5kQmx1ciI+PC9mZUdhdXNzaWFuQmx1cj48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjkwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiNmZmYiPjwvcmVjdD48ZyBmaWx0ZXI9InVybCgjYmx1cjEpIj48Y2lyY2xlIGN4PSI2NSIgY3k9IjI5IiBmaWxsPSIjYmVkYWZmIiByPSIzMzIiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijc3MiIgY3k9IjM1IiBmaWxsPSIjZmZmIiByPSIzMzIiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjU2OCIgY3k9IjExIiBmaWxsPSIjYmVkYWZmIiByPSIzMzIiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjI3OCIgY3k9IjU5IiBmaWxsPSIjYmVkYWZmIiByPSIzMzIiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjI1MyIgY3k9IjIyOCIgZmlsbD0iI2ZmZiIgcj0iMzMyIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIzNzkiIGN5PSI0MzUiIGZpbGw9IiNiZWRhZmYiIHI9IjMzMiI+PC9jaXJjbGU+PC9nPjwvc3ZnPg==")] before:bg-center before:bg-repeat before:blur-3xl dark:before:bg-[url("data:image/svg+xml;base64,PHN2ZyBpZD0idmlzdWFsIiB2aWV3Qm94PSIwIDAgOTAwIDQ1MCIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI0NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSI+PGRlZnM+PGZpbHRlciBpZD0iYmx1cjEiIHg9Ii0xMCUiIHk9Ii0xMCUiIHdpZHRoPSIxMjAlIiBoZWlnaHQ9IjEyMCUiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ij48L2ZlRmxvb2Q+PGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiPjwvZmVCbGVuZD48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxNDkiIHJlc3VsdD0iZWZmZWN0MV9mb3JlZ3JvdW5kQmx1ciI+PC9mZUdhdXNzaWFuQmx1cj48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjkwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiMwZTE3MmMiPjwvcmVjdD48ZyBmaWx0ZXI9InVybCgjYmx1cjEpIj48Y2lyY2xlIGN4PSI2NSIgY3k9IjI5IiBmaWxsPSIjMTcyNDU1IiByPSIzMzIiPjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijc3MiIgY3k9IjM1IiBmaWxsPSIjMGUxNzJjIiByPSIzMzIiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjU2OCIgY3k9IjExIiBmaWxsPSIjMTcyNDU1IiByPSIzMzIiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjI3OCIgY3k9IjU5IiBmaWxsPSIjMTcyNDU1IiByPSIzMzIiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjI1MyIgY3k9IjIyOCIgZmlsbD0iIzBlMTcyYyIgcj0iMzMyIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIzNzkiIGN5PSI0MzUiIGZpbGw9IiMxNzI0NTUiIHI9IjMzMiI+PC9jaXJjbGU+PC9nPjwvc3ZnPg==")]'
        >
          <div className='flex w-7xl items-center gap-5 self-center px-5 py-5 sm:px-10 sm:py-10'>
            <div className='size-16 rounded-full bg-slate-300/50 p-3 text-blue-500 sm:size-20 sm:p-4 dark:bg-slate-700'>
              <HashTagIcon />
            </div>
            <h1 className='text-primary text-3xl font-bold tracking-tight sm:text-4xl'>{topic}</h1>
          </div>
        </header>
        <div className='max-w-7xl self-center px-5 py-10 sm:px-10'>
          <h1 className='text-primary mb-10 text-3xl font-bold tracking-tight sm:text-4xl'>{articlesLabel}</h1>
          <ArticleList articles={articles} locale={locale} />
        </div>
      </main>
    </>
  );
};

export { Page as default, generateMetadata, generateStaticParams };
