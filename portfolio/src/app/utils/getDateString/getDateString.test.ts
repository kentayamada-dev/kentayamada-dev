import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDateString } from './getDateString';

describe('getDateString', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024/08/08 09:00:00'));
  });

  it('should return date in "en" locale for current year', () => {
    expect.assertions(2);

    const utcTime = new Date().toISOString();

    expect(getDateString(utcTime, 'en')).toBe('Aug 8');
  });

  it('should return date in "ja" locale for current year', () => {
    expect.assertions(1);

    const utcTime = new Date().toISOString();

    expect(getDateString(utcTime, 'ja')).toBe('8月8日');
  });

  it('should return date with year if the date is not in the current year', () => {
    expect.assertions(2);
    const utcTime = '2022-08-26T10:00:00Z';

    expect(getDateString(utcTime, 'en')).toBe('2022-08-26');
    expect(getDateString(utcTime, 'ja')).toBe('2022-08-26');
  });
});
