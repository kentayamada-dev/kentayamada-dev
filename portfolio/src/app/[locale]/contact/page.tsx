'use cache';

import { notFound } from 'next/navigation';
import { ContactFormWrapper } from '@/components/designSystem/organisms';
import { contentfulType } from '@/constants/contentful';
import { navigationItems } from '@/constants/navigation';
import { getContact, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { throwColoredError } from '@/utils';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.contact);

  if (metadata === null) {
    return throwColoredError(`metadata <${contentfulType.metadata.contact}> is empty`, 'red');
  }

  return getMetadataObject(
    'website',
    navigationItems(locale).contact.href,
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

  return (
    <main className='w-full self-center px-5 py-10 sm:max-w-7xl sm:px-10 sm:py-20'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='md:pr-20'>
          <h1 className='text-primary text-4xl font-semibold tracking-tight sm:text-5xl'>{contact.title}</h1>
          <p className='text-secondary mt-5 text-base/7 sm:mt-10 sm:text-lg/8'>{contact.subtitle}</p>
        </div>
        <div className='mt-16 md:mt-0'>
          <ContactFormWrapper locale={locale} />
        </div>
      </div>
    </main>
  );
};

export { Page as default, generateMetadata };
