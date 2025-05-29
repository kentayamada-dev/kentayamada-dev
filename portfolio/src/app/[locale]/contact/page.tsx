import { notFound } from 'next/navigation';
import { ContactTemplate } from '@/components/designSystem/templates';
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
    { alt: metadata.coverImage.title, url: metadata.coverImage.url },
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

  return <ContactTemplate locale={locale} subtitle={contact.subtitle} title={contact.title} />;
};

export { Page as default, generateMetadata };
