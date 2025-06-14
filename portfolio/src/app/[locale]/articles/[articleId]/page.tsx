import { notFound } from 'next/navigation';
import { ArticleList } from '@/components/designSystem/molecules';
import { Article, LikeButtonWrapper } from '@/components/designSystem/organisms';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticleBySlug, getArticleSlugs, getArticles } from '@/lib/graphql-request';
import { getEvaluateResult } from '@/lib/next-mdx-remote-client';
import { OPENGRAPH_IMAGE_PATH, getMetadataObject } from '@/lib/nextjs';
import { getCount } from '@/lib/nextjs/actions';
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
    articlePath,
    locale,
    article.description,
    article.title,
    `${articlePath}${OPENGRAPH_IMAGE_PATH}`,
    new Date(article.sys.publishedAt),
    new Date(article.sys.firstPublishedAt)
  );
};

const Page: ArticlePageType = async (props) => {
  const { articleId, locale } = await props.params;
  const article = await getArticleBySlug(locale, articleId);

  if (article === null) {
    return notFound();
  }

  const articlesDict = dictionaries[locale].articles;
  const articlesHref = navigationItems(locale).articles.href;
  const viewKey = getRedisKey('article', 'view', articleId);
  const likeKey = getRedisKey('article', 'like', articleId);
  const articleLikeCount = await getCount(likeKey);

  const articles = await Promise.all(
    (await getArticles(locale)).map(async (articleData) => {
      const viewCount = await getCount(getRedisKey('article', 'view', articleData.slug));
      const likeCount = await getCount(getRedisKey('article', 'like', articleData.slug));

      return {
        createdAt: new Date(article.sys.firstPublishedAt),
        description: article.description,
        href: `${articlesHref}/${articleData.slug}`,
        likeCount,
        title: articleData.title,
        topics: articleData.topics,
        viewCount
      };
    })
  );

  const { content } = await getEvaluateResult(article.content, locale);

  return (
    <>
      <ViewTracker keyName={viewKey} />
      <main className='my-20 flex max-w-7xl flex-col self-center sm:mx-10'>
        <Article
          articleTitle={article.title}
          content={content}
          createdAt={new Date(article.sys.firstPublishedAt)}
          locale={locale}
          tocTitle={articlesDict.toc}
          topics={article.topics}
          updatedAt={new Date(article.sys.publishedAt)}
        />
        <div className='mt-5'>
          <LikeButtonWrapper likeCount={articleLikeCount} likeKey={likeKey} locale={locale} />
        </div>
        <div className='mt-20 w-full px-5 sm:px-0'>
          <h2 className='text-primary mb-8 text-3xl font-semibold sm:text-4xl'>{articlesDict.recommend}</h2>
          <ArticleList articles={articles} locale={locale} />
        </div>
      </main>
    </>
  );
};

export { Page as default, generateMetadata, generateStaticParams };
