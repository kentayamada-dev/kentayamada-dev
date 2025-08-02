import { notFound } from 'next/navigation';
import { ArticleList } from '@/components/designSystem/molecules/articleList';
import { Article } from '@/components/designSystem/organisms/article';
import { contentfulType } from '@/constants/contentful';
import { envServer } from '@/constants/env/server';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticleBySlug, getArticleSlugs, getArticles, getMetadata } from '@/lib/fetch';
import { getEvaluateResult } from '@/lib/next-mdx-remote-client';
import { OG, getMetadataObject, getNotFoundMetadataObject } from '@/lib/nextjs';
import { getCount, incrementCount } from '@/lib/nextjs/actions';
import { JsonLd } from '@/lib/nextjs/jsonLd';
import { ViewTracker } from '@/lib/nextjs/viewTracker';
import { getRedisKey } from '@/utils/getRedisKey';
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
    const metadata = await getMetadata(locale, contentfulType.metadata.pageNotFound);

    return getNotFoundMetadataObject(locale, metadata.description, metadata.title, metadata.coverImage.url);
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
    `${articlePath}${OG.PATH}`,
    new Date(article.sys.publishedAt),
    new Date(article.sys.firstPublishedAt)
  );
};

const Page: ArticlePageType = async (props) => {
  const { articleId, locale } = await props.params;
  const article = await getArticleBySlug(locale, articleId);

  if (article === null) {
    notFound();
  }

  const metadata = await getMetadata(locale, contentfulType.metadata.kentaYamada);
  const navigation = navigationItems(locale);
  const { articles: articlesDict, myName } = dictionaries[locale];
  const viewKey = getRedisKey('article', 'view', articleId);
  const likeKey = getRedisKey('article', 'like', articleId);
  const articleLikeCount = await getCount(likeKey);
  const { content } = await getEvaluateResult(article.content, locale);

  const articles = await Promise.all(
    (await getArticles(locale, 2)).map(async (articleData) => {
      const viewCount = await getCount(getRedisKey('article', 'view', articleData.slug));
      const likeCount = await getCount(getRedisKey('article', 'like', articleData.slug));

      return {
        createdAt: new Date(article.sys.firstPublishedAt),
        href: `${navigation.articles.href}/${articleData.slug}`,
        likeCount,
        subtitle: article.subtitle,
        title: articleData.title,
        topics: articleData.topics.sort(),
        viewCount
      };
    })
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'author': [
      {
        '@type': 'Person',
        'name': myName,
        'url': `${envServer.SITE_URL}${navigation.home.href}`
      }
    ],
    'dateModified': article.sys.publishedAt,
    'datePublished': article.sys.firstPublishedAt,
    'headline': article.title,
    'image': [`${envServer.SITE_URL}${navigation.articles.href}/${articleId}${OG.PATH}`],
    'publisher': [
      {
        '@type': 'Organization',
        'name': metadata.title,
        'url': `${envServer.SITE_URL}${navigation.home.href}`
      }
    ]
  };

  const handleCountLike = async (): Promise<void> => {
    'use server';
    await incrementCount(likeKey);
  };

  const topics = article.topics.sort().map((topic) => {
    return {
      path: `${navigation.topics.href}/${encodeURIComponent(topic)}`,
      title: topic
    };
  });

  return (
    <>
      <JsonLd jsonLd={jsonLd} />
      <ViewTracker keyName={viewKey} />
      <main className='my-20 flex max-w-7xl flex-col self-center sm:mx-10'>
        <Article
          articleTitle={article.title}
          content={content}
          createdAt={new Date(article.sys.firstPublishedAt)}
          likeCount={articleLikeCount}
          locale={locale}
          onCountLike={handleCountLike}
          tocTitle={articlesDict.toc}
          topics={topics}
          updatedAt={new Date(article.sys.publishedAt)}
          url={`${envServer.SITE_URL}${navigation.articles.href}/${articleId}`}
        />
        <div className='mt-20 w-full px-5 sm:px-0'>
          <h2 className='text-primary mb-8 text-3xl font-bold tracking-tight sm:text-4xl'>{articlesDict.recommend}</h2>
          <ArticleList articles={articles} locale={locale} />
        </div>
      </main>
    </>
  );
};

export { Page as default, generateMetadata, generateStaticParams };
