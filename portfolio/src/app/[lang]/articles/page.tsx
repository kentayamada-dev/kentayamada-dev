import { notFound } from 'next/navigation';
import { ArticlesTemplate } from '@/components/templates';
import { contentfulType } from '@/constants/contentful';
import { navigationItems } from '@/constants/navigation';
import { getArticles, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import type { AsyncJSXElementType, AsyncMetadataType, PageProps } from '@/types/components';

async function generateMetadata(props: PageProps): AsyncMetadataType {
  const { lang } = await props.params;
  const { coverImage, description, sys, title } = await getMetadata(lang, contentfulType.metadata.articles, notFound);

  return getMetadataObject(
    'website',
    navigationItems.articles.href,
    lang,
    description,
    title,
    { alt: coverImage.title, url: coverImage.url },
    new Date(sys.publishedAt),
    new Date(sys.firstPublishedAt)
  );
}

async function Page(props: PageProps): AsyncJSXElementType {
  const { lang } = await props.params;
  const articles = await getArticles(lang);

  return <ArticlesTemplate articles={articles} articlesHref={navigationItems.articles.href} lang={lang} />;
}

export { Page as default, generateMetadata };
