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

  const getRehypeReactOptions = (): Options => {
    // eslint-disable-next-line custom/as-const-satisfies
    const headings = {
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0
    };

    const getHeadingId = (heading: keyof typeof headings): string => {
      headings[heading] += 1;

      return `${heading}-${headings[heading]}`;
    };

    return {
      Fragment,
      /* eslint-disable no-restricted-syntax, react/no-unstable-nested-components, no-undefined */
      components: {
        h1: ({ children }) => {
          return <h1 id={getHeadingId('h1')}>{children}</h1>;
        },
        h2: ({ children }) => {
          return <h2 id={getHeadingId('h2')}>{children}</h2>;
        },
        h3: ({ children }) => {
          return <h3 id={getHeadingId('h3')}>{children}</h3>;
        },
        h4: ({ children }) => {
          return <h4 id={getHeadingId('h4')}>{children}</h4>;
        }
      },
      /* eslint-enable no-restricted-syntax, react/no-unstable-nested-components, no-undefined  */

      // @ts-expect-error type mismatch
      jsx,
      // @ts-expect-error type mismatch
      jsxs
    } as const;
  };

  const content = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, getRehypeReactOptions())
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
