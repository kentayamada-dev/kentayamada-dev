/* eslint-disable custom/consolidate-exports */
import { setLocaleCookie } from 'app/lib/cookies-next';
import { cookies } from 'next/headers';
import { type MiddlewareConfig, type NextMiddleware, type NextRequest, NextResponse } from 'next/server';
import { arrayOfLocales, defaultLocale, localeCookieName, locales } from '@/constants/i18n';
import { isOneOf, isString } from '@/typeGuards';
import { isPathStartingWith } from '@/utils';
import type { LocaleKeyType } from '@/constants/i18n/types';

const getPrimaryLanguage = (acceptLanguage: string | null, cookieLocale: string | undefined): LocaleKeyType => {
  if (isString(cookieLocale) && isOneOf(cookieLocale, locales)) {
    return cookieLocale;
  }

  const localeFromPrimaryLanguage = acceptLanguage?.split(',')[0]?.split(';')[0]?.trim().split('-')[0];

  if (isString(localeFromPrimaryLanguage) && isOneOf(localeFromPrimaryLanguage, locales)) {
    return localeFromPrimaryLanguage;
  }

  return defaultLocale;
};

// eslint-disable-next-line custom/as-const-satisfies
export const config: MiddlewareConfig = {
  // eslint-disable-next-line @typescript-eslint/lines-around-comment
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

// eslint-disable-next-line max-statements
export const middleware: NextMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();
  let value: LocaleKeyType = defaultLocale;

  if (!isPathStartingWith(pathname, 'storybook')) {
    const foundLocale = arrayOfLocales.find((locale) => {
      return isPathStartingWith(pathname, locale);
    });

    if (foundLocale) {
      value = foundLocale;
    } else {
      const locale = getPrimaryLanguage(request.headers.get('accept-language'), cookies().get(localeCookieName)?.value);

      response = NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
      value = locale;
    }

    setLocaleCookie(value, { req: request, res: response });
  }

  return response;
};
