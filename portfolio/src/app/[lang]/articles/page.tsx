import { notFound } from 'next/navigation';
import { ArticlesLayout } from '@/components/layouts/articlesLayout';
import { navigationItems } from '@/constants/navigation';
import { getArticles, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import type { Metadata } from 'next';
import type { JSXAsyncElementType, PageProps } from '@/types/components';

async function generateMetadata(props: PageProps): Promise<Metadata> {
  const metadata = await getMetadata(props.params.lang, 'articles', notFound);

  return getMetadataObject(
    'website',
    navigationItems.articles.href,
    props.params.lang,
    metadata.description,
    metadata.title,
    { alt: metadata.coverImage.title, url: metadata.coverImage.url },
    new Date(metadata.sys.publishedAt),
    new Date(metadata.sys.firstPublishedAt)
  );
}

async function Page(props: PageProps): JSXAsyncElementType {
  const articles = await getArticles(props.params.lang, 'sys_publishedAt_DESC');

  return <ArticlesLayout articles={articles} articlesHref={navigationItems.articles.href} lang={props.params.lang} />;
}

export { Page as default, generateMetadata };
