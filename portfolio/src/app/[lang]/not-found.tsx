import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { NotFound } from '@/components/molecules';
import { contentfulType } from '@/constants/contentful';
import { arrayOfLocales, defaultLocale, localeCookieName } from '@/constants/i18n';
import { getMetadata } from '@/lib/graphql-request';
import { getNotFoundMetadataObject } from '@/lib/nextjs';
import { isValueInArray } from '@/typeGuards';
import type { GenerateMetadataType, NotFoundPageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { lang } = await props.params;
  const { coverImage, description, title } = await getMetadata(lang, contentfulType.metadata.pageNotFound, notFound);

  return getNotFoundMetadataObject(lang, description, title, {
    alt: coverImage.title,
    url: coverImage.url
  });
};

const NotFoundPage: NotFoundPageType = async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const lang = isValueInArray(cookieLocale, arrayOfLocales) ? cookieLocale : defaultLocale;
  const metadata = await getMetadata(lang, contentfulType.metadata.pageNotFound, notFound);

  return <NotFound lang={lang} mainMessage={metadata.title} subMessage={metadata.description} />;
};

export { NotFoundPage as default, generateMetadata };
