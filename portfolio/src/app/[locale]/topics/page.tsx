import Link from 'next/link';
import { contentfulType } from '@/constants/contentful';
import { envServer } from '@/constants/env/server';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getMetadata, getTopic } from '@/lib/fetch';
import { getMetadataObject } from '@/lib/nextjs';
import { JsonLd } from '@/lib/nextjs/jsonLd';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.topics);

  return getMetadataObject(
    'website',
    { current: navigationItems(locale).topics.href, en: navigationItems('en').topics.href, ja: navigationItems('ja').topics.href },
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

  const {
    navigation: { home: homeLabel, topics: topicsLabel },
    popularTopics: title
  } = dictionaries[locale];

  const navigation = navigationItems(locale);

  const topics = (await getTopic()).topic.map((slug) => {
    return {
      href: `${navigation.topics.href}/${slug}`,
      title: decodeURIComponent(slug)
    };
  });

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
        'name': topicsLabel,
        'position': 2
      }
    ],
    'name': navigation.topics.href
  };

  return (
    <>
      <JsonLd jsonLd={jsonLd} />
      <main className='w-full self-center px-5 py-10 text-center sm:max-w-7xl sm:px-10 sm:py-20'>
        <h1 className='text-primary mb-14 text-3xl font-bold tracking-tight sm:text-4xl'>{title}</h1>
        <div className='grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-6'>
          {topics.map((topic) => {
            return (
              <Link
                className='bg-primary hover-primary flex h-20 items-center justify-center rounded-lg p-2 sm:h-32 sm:p-5'
                href={topic.href}
                key={topic.href}
              >
                <span className='text-primary text-center text-sm font-bold tracking-tight sm:text-lg'>{topic.title}</span>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
};

export { Page as default, generateMetadata };
