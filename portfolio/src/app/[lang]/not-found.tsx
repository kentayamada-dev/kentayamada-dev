import { cookies } from 'next/headers';
import { NotFound } from '@/components/elements';
import { arrayOfLocales, defaultLocale, localeCookieName } from '@/constants/i18n';
import { isValueInArray } from '@/typeGuards';
import type { JSXElementType } from '@/types/components';

function NotFoundPage(): JSXElementType {
  const cookieLocale = cookies().get(localeCookieName)?.value;
  const lang = isValueInArray(cookieLocale, arrayOfLocales) ? cookieLocale : defaultLocale;

  return <NotFound lang={lang} />;
}

export { NotFoundPage as default };
