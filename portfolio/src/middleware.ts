import { cookies } from 'next/headers';
import { NextResponse, userAgent } from 'next/server';
import { arrayOfLocales, defaultLocale, localeCookieName } from '@/constants/i18n';
import { setLocaleCookie } from '@/lib/cookies-next';
import { isValueInArray } from '@/typeGuards/isValueInArray';
import { isPathStartingWith } from '@/utils/isPathStartingWith';
import type { MiddlewareConfig, NextMiddleware } from 'next/server';
import type { LocaleKeyType } from '@/constants/i18n/types';

const getLocale = (acceptLanguage: string | null, cookieLocale: string | null): LocaleKeyType => {
  if (isValueInArray(cookieLocale, arrayOfLocales)) {
    return cookieLocale;
  }

  const primaryLang = acceptLanguage?.split(',')[0]?.split(';')[0]?.trim().split('-')[0];

  return isValueInArray(primaryLang, arrayOfLocales) ? primaryLang : defaultLocale;
};

// eslint-disable-next-line import/group-exports
export const config: MiddlewareConfig = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|apple-icon.png).*)']
};

// eslint-disable-next-line import/group-exports
export const middleware: NextMiddleware = async (request) => {
  if (request.method === 'HEAD') {
    return new NextResponse(null, { status: 200 });
  }

  const { isBot } = userAgent(request);
  let response = NextResponse.next();

  if (isBot) {
    return response;
  }

  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const foundLocale = arrayOfLocales.find((locale) => {
    return isPathStartingWith(pathname, locale);
  });

  const value = foundLocale ?? getLocale(request.headers.get('accept-language'), cookieStore.get(localeCookieName)?.value ?? null);

  if (!foundLocale) {
    response = NextResponse.redirect(new URL(`/${value}${pathname}`, request.url));
  }

  await setLocaleCookie(value, { req: request, res: response });

  return response;
};
