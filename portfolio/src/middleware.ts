/* eslint-disable custom/consolidate-exports */
import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from '@/constants/locales';
import type { MiddlewareConfig, NextMiddleware, NextRequest } from 'next/server';

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
  return i18nRouter(request, i18nConfig);
};
