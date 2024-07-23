const getPathnameWithoutLocale = (url: string): string => {
  const parsedUrl = new URL(url);
  const { pathname } = parsedUrl;
  // Matches /en/ or /en-US/
  const localeRegex = /^\/[a-z]{2}(?:-[A-Z]{2})?\//u;
  const pathnameWithoutLocale = pathname.replace(localeRegex, '/');

  return pathnameWithoutLocale;
};

export { getPathnameWithoutLocale };
