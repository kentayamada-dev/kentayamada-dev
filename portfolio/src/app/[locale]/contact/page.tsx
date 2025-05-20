import { ContactTemplate } from '@/components/designSystem/templates';
import { contentfulType } from '@/constants/contentful';
import { navigationItems } from '@/constants/navigation';
import { getContact, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import type { ArticlesPageType, GenerateMetadataType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const { coverImage, description, sys, title } = await getMetadata(locale, contentfulType.metadata.contact);

  return getMetadataObject(
    'website',
    navigationItems.contact.href,
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
  const { subtitle, title } = await getContact(locale);

  return <ContactTemplate locale={locale} subtitle={subtitle} title={title} />;
};

export { Page as default, generateMetadata };
