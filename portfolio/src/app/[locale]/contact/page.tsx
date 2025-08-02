import Link from 'next/link';
import { ContactFormWrapper } from '@/components/designSystem/organisms/contactFormWrapper';
import { EmailIcon } from '@/components/icons/emailIcon';
import { LocationIcon } from '@/components/icons/locationIcon';
import { contentfulType } from '@/constants/contentful';
import { envServer } from '@/constants/env/server';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getContact, getMetadata } from '@/lib/fetch';
import { getMetadataObject } from '@/lib/nextjs';
import { JsonLd } from '@/lib/nextjs/jsonLd';
import type { GenerateMetadataType, PageType } from '@/types/components';

const EMAIL = 'kentayamada058@outlook.com';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.contact);

  return getMetadataObject(
    'website',
    {
      current: navigationItems(locale).contact.href,
      en: navigationItems('en').contact.href,
      ja: navigationItems('ja').contact.href
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
  const contact = await getContact(locale);
  const navigation = navigationItems(locale);

  const {
    contact: contactLabel,
    navigation: { contact: contactNavLabel, home: homeNavLabel }
  } = dictionaries[locale];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'item': `${envServer.SITE_URL}${navigation.home.href}`,
        'name': homeNavLabel,
        'position': 1
      },
      {
        '@type': 'ListItem',
        'name': contactNavLabel,
        'position': 2
      }
    ],
    'name': navigation.contact.href
  };

  return (
    <>
      <JsonLd jsonLd={jsonLd} />
      <main className='w-full self-center px-5 py-10 sm:max-w-7xl sm:px-10 sm:py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className='md:pr-20'>
            <h1 className='text-primary text-4xl font-semibold tracking-tight sm:text-5xl'>{contact.title}</h1>
            <p className='text-secondary mt-5 text-base/7 sm:mt-10 sm:text-lg/8'>{contact.subtitle}</p>
            <dl className='mt-14 flex flex-col gap-y-5'>
              <div className='flex items-center gap-x-4'>
                <dt>
                  <span className='sr-only'>{contactLabel.locationLabel}</span>
                  <div className='size-5 text-blue-500'>
                    <LocationIcon />
                  </div>
                </dt>
                <dd className='font-medium'>{contactLabel.locationValue}</dd>
              </div>
              <div className='flex items-center gap-x-4'>
                <dt>
                  <span className='sr-only'>{contactLabel.email}</span>
                  <div className='size-5 text-blue-500'>
                    <EmailIcon />
                  </div>
                </dt>
                <dd>
                  <Link className='link-primary font-medium' href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
          <div className='mt-16 md:mt-0'>
            <ContactFormWrapper locale={locale} />
          </div>
        </div>
      </main>
    </>
  );
};

export { Page as default, generateMetadata };
