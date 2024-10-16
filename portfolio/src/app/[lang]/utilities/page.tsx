import { ArticlesLayout } from '@/components/layouts/articlesLayout';
import { navigationItems } from '@/constants/navigation';
import { getArticles } from '@/lib/graphql-request';
import type { JSXAsyncElementType, PageProps } from '@/types/components';

async function Page(props: PageProps): JSXAsyncElementType {
  const articles = await getArticles(props.params.lang, 'sys_publishedAt_DESC');

  return (
    <ArticlesLayout
      articles={articles.articleCollection.items}
      articlesHref={navigationItems.utilities.href}
      lang={props.params.lang}
    />
  );
}

export { Page as default };
