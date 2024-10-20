import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { NotFound } from '@/components/elements';
import { arrayOfLocales, defaultLocale, localeCookieName } from '@/constants/i18n';
import { getMetadata } from '@/lib/graphql-request';
import { getNotFoundMetadataObject } from '@/lib/nextjs';
import { isValueInArray } from '@/typeGuards';
import type { Metadata } from 'next';
import type { JSXAsyncElementType, PageProps } from '@/types/components';

async function generateMetadata(props: PageProps): Promise<Metadata> {
  const metadata = await getMetadata(props.params.lang, 'page-not-found', notFound);

  return getNotFoundMetadataObject(props.params.lang, metadata.description, metadata.title, {
    alt: metadata.coverImage.title,
    url: metadata.coverImage.url
  });
}

async function NotFoundPage(): JSXAsyncElementType {
  const cookieLocale = cookies().get(localeCookieName)?.value;
  const lang = isValueInArray(cookieLocale, arrayOfLocales) ? cookieLocale : defaultLocale;
  const metadata = await getMetadata(lang, 'page-not-found', notFound);

  return <NotFound lang={lang} mainMessage={metadata.title} subMessage={metadata.description} />;
}

export { NotFoundPage as default, generateMetadata };
