import { ArticlesTemplate } from '@/components/designSystem/templates';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getArticles, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
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
    navigationItems.articles.href,
    locale,
    metadata.description,
    metadata.title,
    { alt: metadata.coverImage.title, url: metadata.coverImage.url },
    new Date(metadata.sys.publishedAt),
    new Date(metadata.sys.firstPublishedAt)
  );
};

const Page: PageType = async (props) => {
  const { locale } = await props.params;
  const title = dictionaries[locale].articles.latest;
  const articlesHref = `/${locale}/${navigationItems.articles.href}`;

  const articles = (await getArticles(locale)).map((article) => {
    return {
      coverImage: {
        title: article.coverImage.title,
        url: article.coverImage.url
      },
      createdAt: new Date(article.sys.firstPublishedAt),
      slug: article.slug,
      title: article.title
    };
  });

  return <ArticlesTemplate articles={articles} articlesHref={articlesHref} locale={locale} title={title} />;
};

export { Page as default, generateMetadata };
