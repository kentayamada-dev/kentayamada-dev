import { describe, expect, it } from 'vitest';
import { getLocale } from '.';
import type { LocaleKeyArrayType } from '@/constants/i18n/types';

describe('getLocale', () => {
  const locales: LocaleKeyArrayType = ['en', 'ja'];
  const defaultLocale = 'en';

  it('should return the cookie locale if it is valid', () => {
    expect.assertions(1);

    const result = getLocale('en-US,en;q=0.9', 'ja', defaultLocale, locales);

    expect(result).toBe('ja');
  });

  it('should return the cookie locale even if Accept-Language is null', () => {
    expect.assertions(1);

    const result = getLocale(null, 'ja', defaultLocale, locales);

    expect(result).toBe('ja');
  });

  it('should return the default locale if neither the cookie nor Accept-Language match any locale', () => {
    expect.assertions(1);

    const result = getLocale('de-DE,de;q=0.9', null, defaultLocale, locales);

    expect(result).toBe(defaultLocale);
  });

  it('should return the default locale if both Accept-Language and cookie are null or undefined', () => {
    expect.assertions(1);

    const result = getLocale(null, null, defaultLocale, locales);

    expect(result).toBe(defaultLocale);
  });

  it('should return the primary language from Accept-Language if it matches a valid locale', () => {
    expect.assertions(1);

    const result = getLocale('en-GB,en;q=0.9', null, defaultLocale, locales);

    expect(result).toBe('en');
  });
});
