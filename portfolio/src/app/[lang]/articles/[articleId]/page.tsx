import { gql } from 'graphql-request';
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
import { apiClient } from '@/lib/graphql-request';
import { getRehypeReactOptions } from '@/lib/rehype-react';
import type { ArticlePageProps, JSXAsyncElementType, PostGenerateStaticParamsReturn } from '@/types/components';
import type { ArticleResponseType, ArticleSlugsResponseType, ArticlesResponseType } from '@/types/contentful';
// eslint-disable-next-line import/order, import/extensions
import 'katex/dist/katex.min.css';

async function generateStaticParams(): PostGenerateStaticParamsReturn {
  const articleSlugs = await apiClient.request<ArticleSlugsResponseType>(gql`
    query Query {
      articleCollection {
        items {
          slug
        }
      }
    }
  `);

  return articleSlugs.articleCollection.items.map((post) => {
    return {
      articleId: post.slug
    };
  });
}

async function Page(props: ArticlePageProps): JSXAsyncElementType {
  const articles = await apiClient.request<ArticlesResponseType>(
    gql`
      query ArticleCollection($locale: String!, $order: [ArticleOrder]!) {
        articleCollection(locale: $locale, order: $order) {
          items {
            title
            slug
            sys {
              publishedAt
            }
            coverImage {
              url
              title
            }
          }
        }
      }
    `,
    {
      locale: props.params.lang,
      order: 'sys_publishedAt_DESC'
    }
  );

  const article = await apiClient.request<ArticleResponseType>(
    gql`
      query Query($where: ArticleFilter!, $locale: String!) {
        articleCollection(where: $where, locale: $locale) {
          items {
            content
            title
            sys {
              publishedAt
            }
          }
        }
      }
    `,
    {
      locale: props.params.lang,
      where: {
        slug: props.params.articleId
      }
    }
  );

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
