/* eslint-disable custom/consolidate-exports */
import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from '@/constants/locales';
import type { MiddlewareConfig, NextMiddleware, NextRequest } from 'next/server';

// eslint-disable-next-line custom/as-const-satisfies
export const config: MiddlewareConfig = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
};

// eslint-disable-next-line @typescript-eslint/padding-line-between-statements
export const middleware: NextMiddleware = (request: NextRequest) => {
  return i18nRouter(request, i18nConfig);
};
