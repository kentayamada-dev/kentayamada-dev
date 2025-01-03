import type { currencies } from '.';

type CurrencyType = (typeof currencies)[number];

type CurrenciesType = readonly CurrencyType[];

type CurrencyPairType = {
  [A in CurrencyType]: {
    [B in CurrencyType]: A extends B ? never : `${A}/${B}`;
  }[CurrencyType];
}[CurrencyType];

export type { CurrenciesType, CurrencyPairType, CurrencyType };
