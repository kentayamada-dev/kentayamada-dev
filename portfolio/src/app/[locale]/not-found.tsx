import { cookies } from 'next/headers';
import { NotFound } from '@/components/designSystem/molecules';
import { contentfulType } from '@/constants/contentful';
import { arrayOfLocales, defaultLocale, dictionaries, localeCookieName } from '@/constants/i18n';
import { getMetadata } from '@/lib/graphql-request';
import { getNotFoundMetadataObject } from '@/lib/nextjs';
import { isValueInArray } from '@/typeGuards';
import type { GenerateMetadataType, NotFoundPageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const { coverImage, description, title } = await getMetadata(locale, contentfulType.metadata.pageNotFound);

  return getNotFoundMetadataObject(locale, description, title, {
    alt: coverImage.title,
    url: coverImage.url
  });
};

const NotFoundPage: NotFoundPageType = async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const locale = isValueInArray(cookieLocale, arrayOfLocales) ? cookieLocale : defaultLocale;
  const metadata = await getMetadata(locale, contentfulType.metadata.pageNotFound);
  const { homeLinkLabel } = dictionaries[locale].labels;

  return (
    <NotFound
      homeHref={`/${locale}`}
      label={homeLinkLabel}
      message={{
        main: metadata.title,
        sub: metadata.description
      }}
    />
  );
};

export { NotFoundPage as default, generateMetadata };
