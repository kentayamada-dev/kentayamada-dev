import { gql } from 'graphql-request';
import { Articles } from '@/components/features/articles';
import { apiClient } from '@/lib/graphql-request';
import type { JSXAsyncElementType, PageProps } from '@/types/components';
import type { ArticlesResponseType } from '@/types/contentful';

async function Page(props: PageProps): JSXAsyncElementType {
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

  return <Articles articles={articles.blogPostCollection.items} lang={props.params.lang} />;
}

export { Page as default };
