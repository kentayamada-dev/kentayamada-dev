import { gql } from 'graphql-request';
import { notFound } from 'next/navigation';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import rehypeReact, { type Options } from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { ArticleLayout } from '@/components/layouts/articleLayout';
import { apiClient } from '@/lib/graphql-request';
import type { ArticlePageProps, JSXAsyncElementType, PostGenerateStaticParamsReturn } from '@/types/components';
import type { ArticleResponseType, ArticleSlugsResponseType, ArticlesResponseType } from '@/types/contentful';

async function generateStaticParams(): PostGenerateStaticParamsReturn {
  const articleSlugs = await apiClient.request<ArticleSlugsResponseType>(gql`
    {
      blogPostCollection {
        items {
          slug
        }
      }
    }
  `);

  return articleSlugs.blogPostCollection.items.map((post) => {
    return {
      articleId: post.slug
    };
  });
}

async function Page(props: ArticlePageProps): JSXAsyncElementType {
  const articles = await apiClient.request<ArticlesResponseType>(
    gql`
      query ($locale: String!, $order: [BlogPostOrder]!) {
        blogPostCollection(locale: $locale, order: $order) {
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
      query ($slug: String!, $locale: String!) {
        blogPostCollection(where: { slug: $slug }, locale: $locale) {
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
      slug: props.params.articleId
    }
  );

  const [articleData] = article.blogPostCollection.items;

  // eslint-disable-next-line no-undefined
  if (articleData === undefined) {
    notFound();
  }

  const option: Options = {
    Fragment,
    /* eslint-disable no-restricted-syntax, react/no-unstable-nested-components, no-undefined */
    components: {
      h1: ({ children }) => {
        const id = typeof children === 'string' ? children : undefined;

        return <h1 id={id}>{children}</h1>;
      },
      h2: ({ children }) => {
        const id = typeof children === 'string' ? children : undefined;

        return <h2 id={id}>{children}</h2>;
      },
      h3: ({ children }) => {
        const id = typeof children === 'string' ? children : undefined;

        return <h3 id={id}>{children}</h3>;
      },
      h4: ({ children }) => {
        const id = typeof children === 'string' ? children : undefined;

        return <h4 id={id}>{children}</h4>;
      }
    },
    /* eslint-enable no-restricted-syntax, react/no-unstable-nested-components, no-undefined  */

    // @ts-expect-error type mismatch
    jsx,
    // @ts-expect-error type mismatch
    jsxs
  } as const;
  const content = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, option)
    .process(articleData.content);

  return (
    <ArticleLayout
      articles={articles.blogPostCollection.items}
      content={content.result}
      lang={props.params.lang}
      publishedAt={new Date(articleData.sys.publishedAt)}
      title={articleData.title}
    />
  );
}

export { Page as default, generateStaticParams };
