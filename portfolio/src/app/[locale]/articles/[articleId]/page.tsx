import { notFound } from 'next/navigation';
import { ArticleList } from '@/components/designSystem/molecules';
import { Article } from '@/components/designSystem/organisms';
import { contentfulType } from '@/constants/contentful';
import { envServer } from '@/constants/env';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticleBySlug, getArticleSlugs, getArticles, getMetadata } from '@/lib/graphql-request';
import { getEvaluateResult } from '@/lib/next-mdx-remote-client';
import { OPENGRAPH_IMAGE_PATH, getMetadataObject } from '@/lib/nextjs';
import { getCount, incrementCount } from '@/lib/nextjs/actions';
import { JsonLd } from '@/lib/nextjs/jsonLd';
import { ViewTracker } from '@/lib/nextjs/viewTracker';
import { getRedisKey, throwColoredError } from '@/utils';
import type { ArticleGenerateMetadataType, ArticleGenerateStaticParamsType, ArticlePageType } from '@/types/components';

const generateStaticParams: ArticleGenerateStaticParamsType = async () => {
  const articleSlugs = await getArticleSlugs();

  return articleSlugs.map((post) => {
    return {
      articleId: post.slug
    };
  });
};

const generateMetadata: ArticleGenerateMetadataType = async (props) => {
  const { articleId, locale } = await props.params;
  const article = await getArticleBySlug(locale, articleId);

  if (article === null) {
    return throwColoredError(`article <${articleId}> is empty`, 'red');
  }

  const articlePath = `${navigationItems(locale).articles.href}/${articleId}`;

  return getMetadataObject(
    'article',
    {
      current: articlePath,
      en: `${navigationItems('en').articles.href}/${articleId}`,
      ja: `${navigationItems('ja').articles.href}/${articleId}`
    },
    locale,
    article.subtitle,
    article.title,
    `${articlePath}${OPENGRAPH_IMAGE_PATH}`,
    new Date(article.sys.publishedAt),
    new Date(article.sys.firstPublishedAt)
  );
};

const Page: ArticlePageType = async (props) => {
  const { articleId, locale } = await props.params;
  const article = await getArticleBySlug(locale, articleId);
  const metadata = await getMetadata(locale, contentfulType.metadata.kentaYamada);

  if (article === null || metadata === null) {
    return notFound();
  }

  const articlesDict = dictionaries[locale].articles;
  const articlesHref = navigationItems(locale).articles.href;
  const viewKey = getRedisKey('article', 'view', articleId);
  const likeKey = getRedisKey('article', 'like', articleId);
  const articleLikeCount = await getCount(likeKey);

  const articles = await Promise.all(
    (await getArticles(locale, 2)).map(async (articleData) => {
      const viewCount = await getCount(getRedisKey('article', 'view', articleData.slug));
      const likeCount = await getCount(getRedisKey('article', 'like', articleData.slug));

      return {
        createdAt: new Date(article.sys.firstPublishedAt),
        href: `${articlesHref}/${articleData.slug}`,
        likeCount,
        subtitle: article.subtitle,
        title: articleData.title,
        topics: articleData.topics.sort(),
        viewCount
      };
    })
  );

  const { content } = await getEvaluateResult(article.content, locale);
  const { myName } = dictionaries[locale];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'author': [
      {
        '@type': 'Person',
        'name': myName,
        'url': `${envServer.SITE_URL}${navigationItems(locale).home.href}`
      }
    ],
    'dateModified': article.sys.publishedAt,
    'datePublished': article.sys.firstPublishedAt,
    'headline': article.title,
    'image': [`${navigationItems(locale).articles.href}/${articleId}${OPENGRAPH_IMAGE_PATH}`],
    'publisher': [
      {
        '@type': 'Organization',
        'name': metadata.title,
        'url': `${envServer.SITE_URL}${navigationItems(locale).home.href}`
      }
    ]
  };

  const incrementCountHandler = async (): Promise<void> => {
    'use server';
    await incrementCount(likeKey);
  };

  return (
    <>
      <JsonLd jsonLd={jsonLd} />
      <ViewTracker keyName={viewKey} />
      <main className='my-20 flex max-w-7xl flex-col self-center sm:mx-10'>
        <Article
          articleTitle={article.title}
          content={content}
          createdAt={new Date(article.sys.firstPublishedAt)}
          incrementCountHandler={incrementCountHandler}
          likeCount={articleLikeCount}
          locale={locale}
          tocTitle={articlesDict.toc}
          topics={article.topics.sort()}
          updatedAt={new Date(article.sys.publishedAt)}
          url={`${envServer.SITE_URL}${navigationItems(locale).articles.href}/${articleId}`}
        />
        <div className='mt-20 w-full px-5 sm:px-0'>
          <h2 className='text-primary mb-8 text-3xl font-semibold sm:text-4xl'>{articlesDict.recommend}</h2>
          <ArticleList articles={articles} locale={locale} />
        </div>
      </main>
    </>
  );
};

export { Page as default, generateMetadata, generateStaticParams };
