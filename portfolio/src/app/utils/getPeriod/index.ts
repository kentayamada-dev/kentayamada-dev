import { throwColoredError } from '../throwColoredError';

const MIDNIGHT_UTC = 'T00:00:00.000Z';
const PRESENT_DATE = '1000-01-01T00:00:00.000Z';
const ERROR_MESSAGE = 'Both start and end dates must be midnight in UTC.';

const isMidnightUTC = (date: Date): boolean => {
  return date.toISOString().endsWith(MIDNIGHT_UTC);
};

const getPeriod = (startDate: Date, endDate: Date, presentLabel: string): string => {
  if (!isMidnightUTC(startDate) || !isMidnightUTC(endDate)) {
    throwColoredError(ERROR_MESSAGE, 'red');
  }

  const startYear = startDate.getUTCFullYear();
  const isEndDateSpecial = endDate.toISOString() === PRESENT_DATE;
  const endYear = isEndDateSpecial ? presentLabel : endDate.getUTCFullYear();

  return `${startYear} — ${endYear}`;
};

export { getPeriod };
