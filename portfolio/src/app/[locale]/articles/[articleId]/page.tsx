import { notFound } from 'next/navigation';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { ArticleLink } from '@/components/designSystem/molecules';
import { Article, ArticleLikeButton } from '@/components/designSystem/organisms';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticleBySlug, getArticleSlugs, getArticles } from '@/lib/graphql-request';
import { OPENGRAPH_IMAGE_PATH, getMetadataObject } from '@/lib/nextjs';
import { getCount } from '@/lib/nextjs/actions';
import { ViewTracker } from '@/lib/nextjs/viewTracker';
import { getRehypeReactOptions } from '@/lib/rehype-react';
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

  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
  const articleContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, getRehypeReactOptions(locale))
    .use(remarkMath)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      keepBackground: false
    })
    .process(article.content);
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

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

  return (
    <>
      <ViewTracker keyName={viewKey} />
      <main className='my-20 flex max-w-7xl flex-col self-center sm:mx-10'>
        <Article
          articleTitle={article.title}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          content={articleContent.result}
          createdAt={new Date(article.sys.firstPublishedAt)}
          locale={locale}
          tocTitle={articlesDict.toc}
          topics={article.topics}
          updatedAt={new Date(article.sys.publishedAt)}
        />
        <div className='mt-5'>
          <ArticleLikeButton likeCount={articleLikeCount} likeKey={likeKey} locale={locale} />
        </div>
        <div className='mt-20 w-full px-5 sm:px-0'>
          <h2 className='text-primary mb-8 text-3xl font-semibold sm:text-4xl'>{articlesDict.recommend}</h2>
          <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
            {articles.map((articleData) => {
              return (
                <ArticleLink
                  createdAt={articleData.createdAt}
                  description={articleData.description}
                  href={articleData.href}
                  key={articleData.href}
                  likeCount={articleData.likeCount}
                  locale={locale}
                  title={articleData.title}
                  topics={articleData.topics}
                  viewCount={articleData.viewCount}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export { Page as default, generateMetadata, generateStaticParams };
