import { UtilitiesTemplate } from '@/components/designSystem/templates';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getMetadata, getUtilities } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import type { ArticlesPageType, GenerateMetadataType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const { coverImage, description, sys, title } = await getMetadata(locale, contentfulType.metadata.utilities);

  return getMetadataObject(
    'website',
    navigationItems.utilities.href,
    locale,
    description,
    title,
    { alt: coverImage.title, url: coverImage.url },
    new Date(sys.publishedAt),
    new Date(sys.firstPublishedAt)
  );
};

const Page: ArticlesPageType = async (props) => {
  const { locale } = await props.params;
  const utilities = await getUtilities(locale);
  const title = dictionaries[locale].utilities;
  const utilitiesHref = `/${locale}${navigationItems.utilities.href}`;

  return <UtilitiesTemplate locale={locale} title={title} utilities={utilities} utilitiesHref={utilitiesHref} />;
};

export { Page as default, generateMetadata };
