import { describe, expect, it } from 'vitest';
import { getSlugFromUrl } from '.';

describe('getSlugFromUrl', () => {
  it('should return the last part of the URL path as the slug', () => {
    expect.assertions(1);

    const url = new URL('https://example.com/some/path/slug');
    const result = getSlugFromUrl(url);

    expect(result).toBe('slug');
  });

  it('should handle URLs with trailing slashes', () => {
    expect.assertions(1);

    const url = new URL('https://example.com/some/path/slug/');
    const result = getSlugFromUrl(url);

    expect(result).toBe('slug');
  });

  it('should return undefined if the URL path is empty', () => {
    expect.assertions(1);

    const url = new URL('https://example.com/');

    expect(() => {
      return getSlugFromUrl(url);
    }).toThrow('The slug parameter is undefined');
  });

  it('should handle URLs with no path but query parameters', () => {
    expect.assertions(1);

    const url = new URL('https://example.com?query=param');

    expect(() => {
      return getSlugFromUrl(url);
    }).toThrow('The slug parameter is undefined');
  });

  it('should handle URLs with special characters in the slug', () => {
    expect.assertions(1);

    const url = new URL('https://example.com/some/path/slug-with-special_chars');
    const result = getSlugFromUrl(url);

    expect(result).toBe('slug-with-special_chars');
  });
});
