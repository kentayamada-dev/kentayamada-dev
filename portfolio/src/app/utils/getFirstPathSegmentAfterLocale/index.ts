const LOCALE_INDEX = 1;

const getFirstPathSegmentAfterLocale = (path: string): string => {
  const segments = path.split('/').filter(Boolean);

  if (segments.length > LOCALE_INDEX) {
    return `/${segments[LOCALE_INDEX]}`;
  }

  return '';
};

export { getFirstPathSegmentAfterLocale };
