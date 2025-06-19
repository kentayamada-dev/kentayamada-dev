'use cache';

import { UtilitiesList } from '@/components/designSystem/molecules';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getMetadata, getUtilities } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { getCount } from '@/lib/nextjs/actions';
import { getRedisKey, throwColoredError } from '@/utils';
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

  const utilities = await Promise.all(
    (await getUtilities(locale)).map(async (utility) => {
      const viewCount = await getCount(getRedisKey('utility', 'view', utility.slug));
      const likeCount = await getCount(getRedisKey('utility', 'like', utility.slug));

      return {
        href: `${utilitiesHref}/${utility.slug}`,
        likeCount,
        subtitle: utility.subtitle,
        title: utility.title,
        viewCount
      };
    })
  );

  return (
    <main className='w-full self-center px-5 py-10 sm:max-w-7xl sm:px-10 sm:py-20'>
      <h1 className='text-primary mb-8 text-3xl font-semibold sm:text-4xl'>{title}</h1>
      <UtilitiesList locale={locale} utilities={utilities} />
    </main>
  );
};

export { Page as default, generateMetadata };
