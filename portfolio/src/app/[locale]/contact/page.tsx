import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContactFormWrapper } from '@/components/designSystem/organisms';
import { EmailIcon, LocationIcon } from '@/components/icons';
import { contentfulType } from '@/constants/contentful';
import { envServer } from '@/constants/env';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getContact, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { JsonLd } from '@/lib/nextjs/jsonLd';
import { throwColoredError } from '@/utils';
import type { GenerateMetadataType, PageType } from '@/types/components';

const EMAIL = 'kentayamada058@outlook.com';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.contact);

  if (metadata === null) {
    return throwColoredError(`metadata <${contentfulType.metadata.contact}> is empty`, 'red');
  }

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

  if (contact === null) {
    return notFound();
  }

  const { contact: contactLabel } = dictionaries[locale];
  const { contact: contactNavLabel, home: homeNavLabel } = dictionaries[locale].navigation;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'item': `${envServer.SITE_URL}${navigationItems(locale).home.href}`,
        'name': homeNavLabel,
        'position': 1
      },
      {
        '@type': 'ListItem',
        'name': contactNavLabel,
        'position': 2
      }
    ]
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
                <dd className='text-md font-medium'>{contactLabel.locationValue}</dd>
              </div>
              <div className='flex items-center gap-x-4'>
                <dt>
                  <span className='sr-only'>{contactLabel.email}</span>
                  <div className='size-5 text-blue-500'>
                    <EmailIcon />
                  </div>
                </dt>
                <dd>
                  <Link className='link-primary text-md font-medium' href={`mailto:${EMAIL}`}>
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
