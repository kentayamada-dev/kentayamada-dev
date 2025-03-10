import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { arrayOfLocales, defaultLocale, localeCookieName } from '@/constants/i18n';
import { setLocaleCookie } from '@/lib/cookies-next';
import { isValueInArray } from '@/typeGuards';
import { isPathStartingWith } from '@/utils';
import type { MiddlewareConfig, NextMiddleware, NextRequest } from 'next/server';
import type { LocaleKeyType } from '@/constants/i18n/types';

const getLocale = (acceptLanguage: string | null, cookieLocale: string | null): LocaleKeyType => {
  if (isValueInArray(cookieLocale, arrayOfLocales)) {
    return cookieLocale;
  }

  const primaryLang = acceptLanguage?.split(',')[0]?.split(';')[0]?.trim()?.split('-')[0];

  return isValueInArray(primaryLang, arrayOfLocales) ? primaryLang : defaultLocale;
};

// eslint-disable-next-line import/group-exports
export const config: MiddlewareConfig = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

// eslint-disable-next-line import/group-exports
export const middleware: NextMiddleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  let response = NextResponse.next();

  if (!isPathStartingWith(pathname, 'storybook')) {
    const foundLocale = arrayOfLocales.find((locale) => {
      return isPathStartingWith(pathname, locale);
    });

    const value = foundLocale ?? getLocale(request.headers.get('accept-language'), cookieStore.get(localeCookieName)?.value ?? null);

    if (!foundLocale) {
      response = NextResponse.redirect(new URL(`/${value}${pathname}`, request.url));
    }

    await setLocaleCookie(value, { req: request, res: response });
  }

  return response;
};
