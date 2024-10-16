import { ArticlesLayout } from '@/components/layouts/articlesLayout';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticles } from '@/lib/graphql-request';
import type { Metadata } from 'next';
import type { JSXAsyncElementType, PageProps } from '@/types/components';

function generateMetadata(props: PageProps): Metadata {
  const dict = dictionaries[props.params.lang];

  return {
    description: dict.articles.articlesDescription,
    title: dict.articles.articles
  };
}

async function Page(props: PageProps): JSXAsyncElementType {
  const articles = await getArticles(props.params.lang, 'sys_publishedAt_DESC');

  return (
    <ArticlesLayout
      articles={articles.articleCollection.items}
      articlesHref={navigationItems.articles.href}
      lang={props.params.lang}
    />
  );
}

export { Page as default, generateMetadata };
