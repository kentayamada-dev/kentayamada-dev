import { describe, expect, it } from 'vitest';
import { getCurrencyPairs } from '.';

describe('getCurrencyPairs', () => {
  it('should return valid currency pairs excluding the base currency', () => {
    expect.assertions(1);

    const baseCurrency = 'USD';
    const currenciesList = ['USD', 'EUR', 'EUR', 'JPY'] as const;
    const result = getCurrencyPairs(baseCurrency, currenciesList);

    expect(result).toStrictEqual(['USD/EUR', 'USD/EUR', 'USD/JPY']);
  });

  it('should return an empty array if the currencies list is empty', () => {
    expect.assertions(1);

    const baseCurrency = 'USD';
    const currenciesList = [] as const;
    const result = getCurrencyPairs(baseCurrency, currenciesList);

    expect(result).toStrictEqual([]);
  });

  it('should return an empty array if the base currency is the only currency in the list', () => {
    expect.assertions(1);

    const baseCurrency = 'USD';
    const currenciesList = ['USD'] as const;
    const result = getCurrencyPairs(baseCurrency, currenciesList);

    expect(result).toStrictEqual([]);
  });

  it('should handle cases where the currencies list contains multiple instances of the base currency', () => {
    expect.assertions(1);

    const baseCurrency = 'USD';
    const currenciesList = ['USD', 'USD', 'EUR', 'JPY'] as const;
    const result = getCurrencyPairs(baseCurrency, currenciesList);

    expect(result).toStrictEqual(['USD/EUR', 'USD/JPY']);
  });

  it('should handle cases where all currencies are different from the base currency', () => {
    expect.assertions(1);

    const baseCurrency = 'USD';
    const currenciesList = ['EUR', 'EUR', 'JPY'] as const;
    const result = getCurrencyPairs(baseCurrency, currenciesList);

    expect(result).toStrictEqual(['USD/EUR', 'USD/EUR', 'USD/JPY']);
  });
});
