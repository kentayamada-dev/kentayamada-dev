import { cookies } from 'next/headers';
import { NotFound } from '@/components/designSystem/organisms/notFound';
import { contentfulType } from '@/constants/contentful';
import { arrayOfLocales, defaultLocale, dictionaries, localeCookieName } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getMetadata } from '@/lib/fetch';
import { isValueInArray } from '@/typeGuards/isValueInArray';
import type { NotFoundPageType } from '@/types/components';

const NotFoundPage: NotFoundPageType = async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const locale = isValueInArray(cookieLocale, arrayOfLocales) ? cookieLocale : defaultLocale;
  const metadata = await getMetadata(locale, contentfulType.metadata.pageNotFound);
  const { homeLinkLabel } = dictionaries[locale].labels;

  return (
    <NotFound
      homeHref={navigationItems(locale).home.href}
      label={homeLinkLabel}
      message={{
        main: metadata.title,
        sub: metadata.description
      }}
    />
  );
};

export { NotFoundPage as default };
