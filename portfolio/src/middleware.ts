/* eslint-disable custom/consolidate-exports */
import { setLocaleCookie } from 'app/lib/cookies-next';
import { cookies } from 'next/headers';
import { type MiddlewareConfig, type NextMiddleware, type NextRequest, NextResponse } from 'next/server';
import { arrayOfLocales, defaultLocale, localeCookieName } from '@/constants/i18n';
import { getLocale, isPathStartingWith } from '@/utils';
import type { LocaleKeyType } from '@/constants/i18n/types';

// eslint-disable-next-line custom/as-const-satisfies
export const config: MiddlewareConfig = {
  // eslint-disable-next-line lines-around-comment
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  let response = NextResponse.next();
  let value: LocaleKeyType = defaultLocale;

  if (!isPathStartingWith(pathname, 'storybook')) {
    const foundLocale = arrayOfLocales.find((locale) => {
      return isPathStartingWith(pathname, locale);
    });

    if (foundLocale) {
      value = foundLocale;
    } else {
      const locale = getLocale(
        request.headers.get('accept-language'),
        cookieStore.get(localeCookieName)?.value ?? null,
        defaultLocale,
        arrayOfLocales
      );

      response = NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
      value = locale;
    }

    await setLocaleCookie(value, { req: request, res: response });
  }

  return response;
};

/* eslint-enable custom/consolidate-exports */
