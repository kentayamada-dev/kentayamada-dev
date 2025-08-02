import { describe, expect, it } from 'vitest';
import { getRedisKey } from '.';

describe(getRedisKey, () => {
  it('should return the correct Redis key for valid inputs', () => {
    expect.assertions(1);

    const result = getRedisKey('article', 'like', '123');

    expect(result).toBe('article:like:123');
  });

  it('should return the correct Redis key for another valid input', () => {
    expect.assertions(1);

    const result = getRedisKey('utility', 'view', '456');

    expect(result).toBe('utility:view:456');
  });

  it('should throw an error if the id is an empty string', () => {
    expect.assertions(1);

    expect(() => {
      return getRedisKey('article', 'like', '');
    }).toThrow('The <id> parameter cannot be an empty string.');
  });
});
