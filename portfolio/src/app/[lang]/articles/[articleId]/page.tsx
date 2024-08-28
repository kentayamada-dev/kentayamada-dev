import { gql } from 'graphql-request';
import { notFound } from 'next/navigation';
import { apiClient } from '@/lib/graphql-request';
import { isEmpty } from '@/utils';
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
        blogPostCollection(where: { slug: $slug }) {
          items {
            content(locale: $locale)
          }
        }
      }
    `,
    {
      locale: props.params.lang,
      slug: props.params.articleId
    }
  );

  if (isEmpty(article.blogPostCollection.items)) {
    notFound();
  }

  return <article className='prose'>{article.blogPostCollection.items[0]?.content}</article>;
}

export { Page as default, generateStaticParams };
