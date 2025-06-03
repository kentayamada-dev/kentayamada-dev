import { describe, expect, it } from 'vitest';
import { getRedisKey } from '.';

describe('getRedisKey', () => {
  it('should generate a key with namespace and id', () => {
    expect.assertions(1);

    const result = getRedisKey('article', '123');

    expect(result).toBe('article:123');
  });

  it('should generate a key with namespace, id, and locale', () => {
    expect.assertions(1);

    const result = getRedisKey('utility', '123', 'en');

    expect(result).toBe('utility:123:en');
  });
});
