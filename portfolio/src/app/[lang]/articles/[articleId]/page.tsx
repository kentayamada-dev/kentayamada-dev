import { gql } from 'graphql-request';
import { notFound } from 'next/navigation';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import rehypeReact, { type Options } from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { LinkIcon } from '@/components/icons';
import { ArticleLayout } from '@/components/layouts/articleLayout';
import { headingLevels } from '@/constants/toc';
import { apiClient } from '@/lib/graphql-request';
import type { HeadingLevelType } from '@/constants/toc/types';
import type {
  ArticlePageProps,
  JSXAsyncElementType,
  JSXElementType,
  PostGenerateStaticParamsReturn
} from '@/types/components';
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
    const headings = headingLevels.reduce(
      (acc, level) => {
        acc[level] = 0;

        return acc;
      },
      // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
      {} as Record<HeadingLevelType, number>
    );

    const getHeadingId = (heading: HeadingLevelType): string => {
      headings[heading] += 1;

      return `${heading}-${headings[heading]}`;
    };

    /* eslint-disable no-restricted-syntax, react/no-unstable-nested-components, react/display-name, react/function-component-definition, react/no-multi-comp, react/destructuring-assignment */
    const createHeadingComponent = (heading: HeadingLevelType) => {
      return ({ children }: React.HTMLAttributes<HTMLHeadingElement>): JSXElementType => {
        const headingId = getHeadingId(heading);
        const Tag = heading;

        return (
          <Tag className='group relative flex items-center' id={headingId}>
            <a
              className='absolute -left-5 block size-5 text-sky-500 opacity-0 focus:opacity-100 group-hover:opacity-100'
              href={`#${headingId}`}
            >
              <LinkIcon />
            </a>
            {children}
          </Tag>
        );
      };
    };
    /* eslint-enable no-restricted-syntax, react/no-unstable-nested-components, react/display-name, react/function-component-definition, react/no-multi-comp, react/destructuring-assignment */

    const components = headingLevels.reduce<
      Record<string, React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>>>
    >((acc, heading) => {
      acc[heading] = createHeadingComponent(heading);

      return acc;
    }, {});

    return {
      Fragment,
      components,
      // @ts-expect-error type mismatch
      jsx,
      // @ts-expect-error type mismatch
      jsxs
    };
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
