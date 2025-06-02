import { ArticlesTemplate } from '@/components/designSystem/templates';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticles, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { getPageViews } from '@/lib/nextjs/actions';
import { throwColoredError } from '@/utils';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.articles);

  if (metadata === null) {
    return throwColoredError(`metadata <${contentfulType.metadata.articles}> is empty`, 'red');
  }

  return getMetadataObject(
    'website',
    navigationItems(locale).articles.href,
    locale,
    metadata.description,
    metadata.title,
    metadata.coverImage.url,
    new Date(metadata.sys.publishedAt),
    new Date(metadata.sys.firstPublishedAt)
  );
};

const Page: PageType = async (props) => {
  const { locale } = await props.params;
  const title = dictionaries[locale].articles.latest;
  const articlesHref = navigationItems(locale).articles.href;

  const articles = await Promise.all(
    (await getArticles(locale)).map(async (article) => {
      const view = await getPageViews(article.title);

      return {
        createdAt: new Date(article.sys.firstPublishedAt),
        description: article.description,
        href: `${articlesHref}/${article.slug}`,
        title: article.title,
        topics: article.topics,
        views: view
      };
    })
  );

  return <ArticlesTemplate articles={articles} locale={locale} title={title} />;
};

export { Page as default, generateMetadata };
