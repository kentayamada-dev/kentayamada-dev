const getFirstPathSegmentAfterLocale = (path: string): string => {
  const segments = path.split('/').filter(Boolean);

  if (segments.length > 1) {
    return `/${segments[1]}`;
  }

  return '';
};

export { getFirstPathSegmentAfterLocale };
