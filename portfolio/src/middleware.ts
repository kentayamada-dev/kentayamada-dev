/* eslint-disable custom/consolidate-exports */
import { cookies } from 'next/headers';
import { type MiddlewareConfig, type NextMiddleware, type NextRequest, NextResponse } from 'next/server';
import { arrayOfLocales, defaultLocale, localeCookie, locales } from '@/constants/locales';
import type { LocaleKeyType } from '@/constants/locales/types';
import { isOneOf, isString } from '@/typeGuards';

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

// eslint-disable-next-line @typescript-eslint/padding-line-between-statements
export const middleware: NextMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const pathnameIsMissingLocale = arrayOfLocales.every((locale) => {
    return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;
  });

  if (pathnameIsMissingLocale) {
    const locale = getPrimaryLanguage(request.headers.get('accept-language'), cookies().get(localeCookie)?.value);
    const sanitizedPathname = pathname.startsWith('/') ? pathname.substring(1) : pathname;

    return NextResponse.redirect(new URL(`/${locale}/${sanitizedPathname}`, request.url));
  }

  return null;
};
