import { describe, expect, it } from 'vitest';
import { getFirstPathSegmentAfterLocale } from '.';

describe('getFirstPathSegmentAfterLocale', () => {
  it('should return the first path segment after the locale', () => {
    expect.assertions(3);

    expect(getFirstPathSegmentAfterLocale('/en/about')).toBe('/about');
    expect(getFirstPathSegmentAfterLocale('/es/contact')).toBe('/contact');
    expect(getFirstPathSegmentAfterLocale('/fr/products/item')).toBe('/products');
  });

  it('should return an empty string if the path has no segments after the locale', () => {
    expect.assertions(3);

    expect(getFirstPathSegmentAfterLocale('/en/')).toBe('');
    expect(getFirstPathSegmentAfterLocale('/es')).toBe('');
    expect(getFirstPathSegmentAfterLocale('/fr/')).toBe('');
  });
});
