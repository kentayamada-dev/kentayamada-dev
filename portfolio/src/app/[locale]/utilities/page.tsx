import { UtilitiesTemplate } from '@/components/designSystem/templates';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getMetadata, getUtilities } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { throwColoredError } from '@/utils';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.utilities);

  if (metadata === null) {
    return throwColoredError(`metadata <${contentfulType.metadata.utilities}> is empty`, 'red');
  }

  return getMetadataObject(
    'website',
    navigationItems.utilities.href,
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
  const utilities = await getUtilities(locale);
  const title = dictionaries[locale].utilities;
  const utilitiesHref = `/${locale}${navigationItems.utilities.href}`;

  return <UtilitiesTemplate locale={locale} title={title} utilities={utilities} utilitiesHref={utilitiesHref} />;
};

export { Page as default, generateMetadata };
