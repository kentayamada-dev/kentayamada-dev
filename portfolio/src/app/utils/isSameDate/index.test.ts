import { describe, expect, it } from 'vitest';
import { isSameDate } from '.';

describe('isSameDate', () => {
  it('should return true for the same date', () => {
    expect.assertions(1);

    const date1 = new Date(2025, 4, 30);
    const date2 = new Date(2025, 4, 30);

    expect(isSameDate(date1, date2)).toBe(true);
  });

  it('should return false for different dates', () => {
    expect.assertions(1);

    const date1 = new Date(2025, 4, 30);
    const date2 = new Date(2025, 4, 31);

    expect(isSameDate(date1, date2)).toBe(false);
  });

  it('should return false for different months', () => {
    expect.assertions(1);

    const date1 = new Date(2025, 4, 30);
    const date2 = new Date(2025, 5, 30);

    expect(isSameDate(date1, date2)).toBe(false);
  });

  it('should return false for different years', () => {
    expect.assertions(1);

    const date1 = new Date(2025, 4, 30);
    const date2 = new Date(2024, 4, 30);

    expect(isSameDate(date1, date2)).toBe(false);
  });

  it('should return true for dates with different times but the same day', () => {
    expect.assertions(1);

    const date1 = new Date(2025, 4, 30, 10, 0, 0);
    const date2 = new Date(2025, 4, 30, 15, 30, 0);

    expect(isSameDate(date1, date2)).toBe(true);
  });
});
