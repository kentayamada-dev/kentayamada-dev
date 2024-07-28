import { describe, expect, it } from 'vitest';
import { getPathnameWithoutLocale } from './getPathnameWithoutLocale';

describe('getPathnameWithoutLocale', () => {
  const locales = ['en', 'ja'];

  it('should handle pathname with locale', () => {
    const pathname1 = '/en/path/to/page';
    const pathname2 = '/ja/path/to/page';
    const result1 = getPathnameWithoutLocale(pathname1, locales);
    const result2 = getPathnameWithoutLocale(pathname2, locales);

    expect(result1).toBe('/path/to/page');
    expect(result2).toBe('/path/to/page');
  });

  it('should handle pathname only locale', () => {
    const pathname = '/en';
    const result = getPathnameWithoutLocale(pathname, locales);

    expect(result).toBe('');
  });

  it('should handle complex pathnames correctly', () => {
    const pathname = '/en/complex/path/to/page';
    const result = getPathnameWithoutLocale(pathname, locales);

    expect(result).toBe('/complex/path/to/page');
  });

  it('should return the same pathname if locale is not in the list', () => {
    const pathname = '/fr/path/to/page';
    const result = getPathnameWithoutLocale(pathname, locales);

    expect(result).toBe('/fr/path/to/page');
  });
});
