import { notFound } from 'next/navigation';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { ArticleTemplate } from '@/components/designSystem/templates';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticleBySlug, getArticleSlugs, getArticles } from '@/lib/graphql-request';
import { OPENGRAPH_IMAGE_PATH, getMetadataObject } from '@/lib/nextjs';
import { getRehypeReactOptions } from '@/lib/rehype-react';
import { throwColoredError } from '@/utils';
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

  const articles = (await getArticles(locale)).map((articleData) => {
    return {
      createdAt: new Date(articleData.sys.firstPublishedAt),
      description: articleData.description,
      href: `${articlesHref}/${articleData.slug}`,
      title: articleData.title
    };
  });

  return (
    <ArticleTemplate
      articleTitle={article.title}
      articles={articles}
      articlesListTitle={articlesDict.recommend}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      content={articleContent.result}
      createdAt={new Date(article.sys.firstPublishedAt)}
      locale={locale}
      tocTitle={articlesDict.toc}
      updatedAt={new Date(article.sys.publishedAt)}
    />
  );
};

export { Page as default, generateMetadata, generateStaticParams };
