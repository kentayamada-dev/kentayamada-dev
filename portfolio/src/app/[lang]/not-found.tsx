import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { NotFound } from '@/components/elements';
import { arrayOfLocales, defaultLocale, localeCookieName } from '@/constants/i18n';
import { getMetadata } from '@/lib/graphql-request';
import { getNotFoundMetadataObject } from '@/lib/nextjs';
import { isValueInArray } from '@/typeGuards';
import type { AsyncJSXElementType, AsyncMetadataType, PageProps } from '@/types/components';

async function generateMetadata(props: PageProps): AsyncMetadataType {
  const { lang } = await props.params;
  const { coverImage, description, title } = await getMetadata(lang, 'page-not-found', notFound);

  return getNotFoundMetadataObject(lang, description, title, {
    alt: coverImage.title,
    url: coverImage.url
  });
}

async function NotFoundPage(): AsyncJSXElementType {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const lang = isValueInArray(cookieLocale, arrayOfLocales) ? cookieLocale : defaultLocale;
  const metadata = await getMetadata(lang, 'page-not-found', notFound);

  return <NotFound lang={lang} mainMessage={metadata.title} subMessage={metadata.description} />;
}

export { NotFoundPage as default, generateMetadata };
