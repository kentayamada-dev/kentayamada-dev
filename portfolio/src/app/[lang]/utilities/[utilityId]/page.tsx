import { notFound } from 'next/navigation';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { ArticleLayout } from '@/components/layouts/articleLayout';
import { navigationItems } from '@/constants/navigation';
import { getArticleBySlug, getArticleSlugs, getArticles } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { getRehypeReactOptions } from '@/lib/rehype-react';
import type { Metadata } from 'next';
import type { ArticlePageProps, JSXAsyncElementType, UtilityGenerateStaticParamsReturn } from '@/types/components';
// eslint-disable-next-line import/order
import 'katex/dist/katex.min.css';

async function generateStaticParams(): UtilityGenerateStaticParamsReturn {
  const articleSlugs = await getArticleSlugs();

  return articleSlugs.map((post) => {
    return {
      utilityId: post.slug
    };
  });
}

async function generateMetadata(props: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(props.params.lang, props.params.articleId, notFound);

  return getMetadataObject(
    'article',
    `${navigationItems.articles.href}/${props.params.articleId}`,
    props.params.lang,
    article.description,
    article.title,
    { alt: article.coverImage.title, url: article.coverImage.url },
    new Date(article.sys.publishedAt),
    new Date(article.sys.firstPublishedAt)
  );
}

async function Page(props: ArticlePageProps): JSXAsyncElementType {
  const articles = await getArticles(props.params.lang);
  const article = await getArticleBySlug(props.params.lang, props.params.articleId, notFound);

  const content = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, getRehypeReactOptions(props.params.lang))
    .use(remarkMath)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      keepBackground: false
    })
    .process(article.content);

  return (
    <ArticleLayout
      articles={articles}
      articlesHref={navigationItems.articles.href}
      content={content.result}
      lang={props.params.lang}
      publishedAt={new Date(article.sys.publishedAt)}
      title={article.title}
    />
  );
}

export { Page as default, generateMetadata, generateStaticParams };
