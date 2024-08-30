import { gql } from 'graphql-request';
import { notFound } from 'next/navigation';
import { Article } from '@/components/features/article';
import { apiClient } from '@/lib/graphql-request';
import type { ArticlePageProps, JSXAsyncElementType, PostGenerateStaticParamsReturn } from '@/types/components';
import type { ArticleResponseType, ArticleSlugsResponseType } from '@/types/contentful';

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

  return (
    <Article
      content={articleData.content}
      lang={props.params.lang}
      publishedAt={articleData.sys.publishedAt}
      title={articleData.title}
    />
  );
}

export { Page as default, generateStaticParams };
