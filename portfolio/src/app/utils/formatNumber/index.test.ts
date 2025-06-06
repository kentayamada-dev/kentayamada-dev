import { describe, expect, it } from 'vitest';
import { formatNumber } from '.';

describe('formatNumber', () => {
  it('formats numbers in English locale ("en")', () => {
    expect.assertions(4);

    expect(formatNumber(1000, 'en')).toBe('1K');
    expect(formatNumber(1500, 'en')).toBe('1.5K');
    expect(formatNumber(1000000, 'en')).toBe('1M');
    expect(formatNumber(1234567, 'en')).toBe('1.2M');
  });

  it('formats numbers in Japanese locale ("ja")', () => {
    expect.assertions(4);

    expect(formatNumber(1000, 'ja')).toBe('1000');
    expect(formatNumber(1500, 'ja')).toBe('1500');
    expect(formatNumber(1000000, 'ja')).toBe('100万');
    expect(formatNumber(1234567, 'ja')).toBe('123.5万');
  });

  it('handles edge cases', () => {
    expect.assertions(2);

    expect(formatNumber(0, 'en')).toBe('0');
    expect(formatNumber(0, 'ja')).toBe('0');
  });
});
