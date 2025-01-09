import { notFound } from 'next/navigation';
import { UtilitiesLayout } from '@/components/layouts/utilitiesLayout';
import { contentfulType } from '@/constants/contentful';
import { navigationItems } from '@/constants/navigation';
import { getMetadata, getUtilities } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import type { AsyncJSXElementType, AsyncMetadataType, PageProps } from '@/types/components';

async function generateMetadata(props: PageProps): AsyncMetadataType {
  const { lang } = await props.params;
  const { coverImage, description, sys, title } = await getMetadata(lang, contentfulType.metadata.utilities, notFound);

  return getMetadataObject(
    'website',
    navigationItems.utilities.href,
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
  const utilities = await getUtilities(lang);

  return <UtilitiesLayout lang={lang} utilities={utilities} utilitiesHref={navigationItems.utilities.href} />;
}

export { Page as default, generateMetadata };
