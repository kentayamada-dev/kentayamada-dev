import { notFound } from 'next/navigation';
import { HomeTemplate } from '@/components/designSystem/templates';
import { contentfulType } from '@/constants/contentful';
import { navigationItems } from '@/constants/navigation';
import { getAbout, getArticles, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { throwColoredError } from '@/utils';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.kentaYamada);

  if (metadata === null) {
    return throwColoredError(`metadata <${contentfulType.metadata.kentaYamada}> is empty`, 'red');
  }

  return getMetadataObject(
    'profile',
    navigationItems(locale).home.href,
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
  const about = await getAbout(locale);

  if (about === null) {
    return notFound();
  }

  const articles = (await getArticles(locale)).map((article) => {
    return {
      createdAt: new Date(article.sys.firstPublishedAt),
      description: article.description,
      slug: article.slug,
      title: article.title
    };
  });

  return (
    <HomeTemplate
      articles={articles}
      articlesHref={navigationItems(locale).articles.href}
      coverImage={{
        title: about.coverImage.title,
        url: about.coverImage.url
      }}
      locale={locale}
      paragraph={about.paragraph}
      subtitle={about.subtitle}
      title={about.title}
    />
  );
};

export { Page as default, generateMetadata };
