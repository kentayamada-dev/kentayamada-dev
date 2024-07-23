import { isString } from '@/typeGuards';

const getPathnameWithoutLocale = (pathname: string, locales: string[]): string => {
  const parts = pathname.split('/').filter(Boolean);

  if (isString(parts[0]) && locales.includes(parts[0])) {
    parts.shift();
  }

  return `/${parts.join('/')}`;
};

export { getPathnameWithoutLocale };
