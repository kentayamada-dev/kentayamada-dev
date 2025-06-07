import { throwColoredError } from '../throwColoredError';

const getSlugFromUrl = (url: URL): string => {
  const pathParts = url.pathname.split('/');
  const slug = pathParts.filter(Boolean).pop();

  // eslint-disable-next-line no-undefined
  if (slug === undefined) {
    return throwColoredError('The slug parameter is undefined', 'red');
  }

  return slug;
};

export { getSlugFromUrl };
