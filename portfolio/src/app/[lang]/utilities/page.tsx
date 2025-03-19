import { notFound } from 'next/navigation';
import { UtilitiesTemplate } from '@/components/templates';
import { contentfulType } from '@/constants/contentful';
import { navigationItems } from '@/constants/navigation';
import { getMetadata, getUtilities } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import type { ArticlesPageType, GenerateMetadataType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
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
};

const Page: ArticlesPageType = async (props) => {
  const { lang } = await props.params;
  const utilities = await getUtilities(lang);

  return <UtilitiesTemplate lang={lang} utilities={utilities} utilitiesHref={navigationItems.utilities.href} />;
};

export { Page as default, generateMetadata };
