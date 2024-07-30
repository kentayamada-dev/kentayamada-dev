import { cookies } from 'next/headers';
import { NotFound } from '@/components/elements';
import { defaultLocale, localeCookieName, locales } from '@/constants/i18n';
import { isOneOf, isString } from '@/typeGuards';
import type { JSXElementType } from '@/types/components';

function NotFoundPage(): JSXElementType {
  const cookieLocale = cookies().get(localeCookieName)?.value;
  const lang = isString(cookieLocale) && isOneOf(cookieLocale, locales) ? cookieLocale : defaultLocale;

  return <NotFound lang={lang} />;
}

export { NotFoundPage as default };
