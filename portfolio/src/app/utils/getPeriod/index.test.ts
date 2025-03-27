import { describe, expect, it } from 'vitest';
import { getPeriod } from '.';

describe('getPeriod', () => {
  const PRESENT_LABEL = 'Present';
  const ERROR_MESSAGE = 'Both start and end dates must be midnight in UTC.';

  it('should return "2020 — 2021" for valid midnight UTC start and end dates', () => {
    expect.assertions(1);

    const startDate = new Date('2020-01-01T00:00:00.000Z');
    const endDate = new Date('2021-01-01T00:00:00.000Z');
    const result = getPeriod(startDate, endDate, PRESENT_LABEL);

    expect(result).toBe('2020 — 2021');
  });

  it('should return "2020 — Present" when the end date is 1000-01-01T00:00:00.000Z', () => {
    expect.assertions(1);

    const startDate = new Date('2020-01-01T00:00:00.000Z');
    const endDate = new Date('1000-01-01T00:00:00.000Z');
    const result = getPeriod(startDate, endDate, PRESENT_LABEL);

    expect(result).toBe('2020 — Present');
  });

  it('should throw an error if the start date is not midnight UTC', () => {
    expect.assertions(1);

    const startDate = new Date('2020-01-01T03:00:00.000Z');
    const endDate = new Date('2021-01-01T00:00:00.000Z');

    expect(() => {
      return getPeriod(startDate, endDate, PRESENT_LABEL);
    }).toThrow(ERROR_MESSAGE);
  });

  it('should throw an error if the end date is not midnight UTC', () => {
    expect.assertions(1);

    const startDate = new Date('2020-01-01T00:00:00.000Z');
    const endDate = new Date('2021-01-01T05:00:00.000Z');

    expect(() => {
      return getPeriod(startDate, endDate, PRESENT_LABEL);
    }).toThrow(ERROR_MESSAGE);
  });
});
