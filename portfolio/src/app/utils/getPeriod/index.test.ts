import { describe, expect, it } from 'vitest';
import { getPeriod } from '.';

describe('getPeriod', () => {
  it('should return the correct period when both startDate and endDate are provided', () => {
    expect.assertions(1);

    const startDate = new Date(2015, 0, 1);
    const endDate = new Date(2020, 11, 31);
    const result = getPeriod(startDate, endDate, 'Present');

    expect(result).toBe('2015 — 2020');
  });

  it('should use the presentLabel when endDate is null', () => {
    expect.assertions(1);

    const startDate = new Date(2010, 0, 1);
    const result = getPeriod(startDate, null, 'Present');

    expect(result).toBe('2010 — Present');
  });

  it('should handle edge cases with the same year for startDate and endDate', () => {
    expect.assertions(1);

    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 11, 31);
    const result = getPeriod(startDate, endDate, 'Present');

    expect(result).toBe('2023 — 2023');
  });

  it('should handle leap years correctly', () => {
    expect.assertions(1);

    const startDate = new Date(2020, 1, 29);
    const endDate = new Date(2021, 1, 28);
    const result = getPeriod(startDate, endDate, 'Present');

    expect(result).toBe('2020 — 2021');
  });

  it('should work with different present labels', () => {
    expect.assertions(1);

    const startDate = new Date(2018, 0, 1);
    const result = getPeriod(startDate, null, 'Now');

    expect(result).toBe('2018 — Now');
  });
});
