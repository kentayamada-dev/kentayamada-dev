import type { CurrencyPairType } from './types';

const currencies = ['USD', 'JPY', 'CNY', 'EUR', 'HKD', 'CAD', 'INR'] as const;

const allCurrencyPairs: CurrencyPairType[] = currencies.flatMap((base) => {
  return currencies
    .filter((quote) => {
      return quote !== base;
    })
    .map((quote) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      return `${base}/${quote}` as CurrencyPairType;
    });
});

export { allCurrencyPairs, currencies };
