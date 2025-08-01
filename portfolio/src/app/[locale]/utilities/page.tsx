import { UtilitiesList } from '@/components/designSystem/molecules/utilitiesList';
import { contentfulType } from '@/constants/contentful';
import { envServer } from '@/constants/env/server';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getMetadata, getUtilities } from '@/lib/fetch';
import { getMetadataObject } from '@/lib/nextjs';
import { getCount } from '@/lib/nextjs/actions';
import { JsonLd } from '@/lib/nextjs/jsonLd';
import { getRedisKey } from '@/utils/getRedisKey';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.utilities);

  return getMetadataObject(
    'website',
    {
      current: navigationItems(locale).utilities.href,
      en: navigationItems('en').utilities.href,
      ja: navigationItems('ja').utilities.href
    },
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
  const navigation = navigationItems(locale);

  const {
    navigation: { home: homeLabel, utilities: utilitiesLabel },
    utilities: title
  } = dictionaries[locale];

  const utilities = await Promise.all(
    (await getUtilities(locale)).map(async (utility) => {
      const viewCount = await getCount(getRedisKey('utility', 'view', utility.slug));
      const likeCount = await getCount(getRedisKey('utility', 'like', utility.slug));

      return {
        href: `${navigation.utilities.href}/${utility.slug}`,
        likeCount,
        subtitle: utility.subtitle,
        title: utility.title,
        viewCount
      };
    })
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'item': `${envServer.SITE_URL}${navigation.home.href}`,
        'name': homeLabel,
        'position': 1
      },
      {
        '@type': 'ListItem',
        'name': utilitiesLabel,
        'position': 2
      }
    ],
    'name': navigation.utilities.href
  };

  return (
    <>
      <JsonLd jsonLd={jsonLd} />
      <main className='w-full self-center px-5 py-10 sm:max-w-7xl sm:px-10 sm:py-20'>
        <h1 className='text-primary mb-8 text-3xl font-bold tracking-tight sm:text-4xl'>{title}</h1>
        <UtilitiesList locale={locale} utilities={utilities} />
      </main>
    </>
  );
};

export { Page as default, generateMetadata };
