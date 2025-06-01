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
    navigationItems(locale).utilities.href,
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
  const title = dictionaries[locale].utilities;
  const utilitiesHref = navigationItems(locale).utilities.href;

  const utilities = (await getUtilities(locale)).map((utility) => {
    return {
      href: `${utilitiesHref}/${utility.slug}`,
      subtitle: utility.subtitle,
      title: utility.title
    };
  });

  return <UtilitiesTemplate locale={locale} title={title} utilities={utilities} />;
};

export { Page as default, generateMetadata };
