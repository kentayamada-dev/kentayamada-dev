import { describe, expect, it } from 'vitest';
import { getTypedKey } from '.';

describe('getTypedKey', () => {
  const options = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
  } as const;

  it('should return the option key if it exists in options', () => {
    expect.assertions(1);

    const optionKey = 'key1';
    const defaultKey = 'key2';
    const result = getTypedKey(optionKey, options, defaultKey);

    expect(result).toBe(optionKey);
  });

  it('should return the default key if option key is undefined', () => {
    expect.assertions(1);

    // eslint-disable-next-line no-undefined
    const optionKey = undefined;
    const defaultKey = 'key2';
    const result = getTypedKey(optionKey, options, defaultKey);

    expect(result).toBe(defaultKey);
  });

  it('should return the default key if option key is not in options', () => {
    expect.assertions(1);

    const optionKey = 'key4';
    const defaultKey = 'key2';
    const result = getTypedKey(optionKey, options, defaultKey);

    expect(result).toBe(defaultKey);
  });

  it('should handle option key being the same as default key', () => {
    expect.assertions(1);

    const optionKey = 'key2';
    const defaultKey = 'key2';
    const result = getTypedKey(optionKey, options, defaultKey);

    expect(result).toBe(defaultKey);
  });
});
