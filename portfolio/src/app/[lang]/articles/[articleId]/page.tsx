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
import { getRehypeReactOptions } from '@/lib/rehype-react';
import type { ArticlePageProps, JSXAsyncElementType, PostGenerateStaticParamsReturn } from '@/types/components';
// eslint-disable-next-line import/order, import/extensions
import 'katex/dist/katex.min.css';

async function generateStaticParams(): PostGenerateStaticParamsReturn {
  const articleSlugs = await getArticleSlugs();

  return articleSlugs.articleCollection.items.map((post) => {
    return {
      articleId: post.slug
    };
  });
}

async function Page(props: ArticlePageProps): JSXAsyncElementType {
  const articles = await getArticles(props.params.lang, 'sys_publishedAt_DESC');
  const article = await getArticleBySlug(props.params.lang, props.params.articleId);
  const [articleData] = article.articleCollection.items;

  // eslint-disable-next-line no-undefined
  if (articleData === undefined) {
    notFound();
  }

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
    .process(articleData.content);

  return (
    <ArticleLayout
      articles={articles.articleCollection.items}
      articlesHref={navigationItems.articles.href}
      content={content.result}
      lang={props.params.lang}
      publishedAt={new Date(articleData.sys.publishedAt)}
      title={articleData.title}
    />
  );
}

export { Page as default, generateStaticParams };
