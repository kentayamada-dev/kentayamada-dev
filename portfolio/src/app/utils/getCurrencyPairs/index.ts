import type { CurrenciesType, CurrencyType } from '@/constants/currencies/types';

const getCurrencyPairs = (baseCurrency: CurrencyType, currenciesList: CurrenciesType): string[] => {
  return currenciesList
    .filter((quoteCurrency) => {
      return quoteCurrency !== baseCurrency;
    })
    .map((quoteCurrency) => {
      return `${baseCurrency}/${quoteCurrency}`;
    });
};

export { getCurrencyPairs };
