import { getEntries } from '@/utils/getEntries';
import { arrayOfLocales } from '../i18n';
import data from './data.json';
import type { LocaleKeyType } from '../i18n/types';
import type { IntlTelEntryType, IntlTelKeyType } from './types';

const intlTelList = data;
const defaultIntlTelCode: IntlTelKeyType = 'US';

const countriesData: Record<LocaleKeyType, Record<IntlTelKeyType, IntlTelEntryType>> = arrayOfLocales.reduce<
  Record<string, Record<IntlTelKeyType, IntlTelEntryType>>
>((acc, locale) => {
  acc[locale] = getEntries(intlTelList)
    .map(([key, value]) => {
      return {
        key,
        ...value,
        label: new Intl.DisplayNames([locale], { type: 'region' }).of(key) ?? ''
      };
    })
    .sort((firstCountry, secondCountry) => {
      return firstCountry.label.localeCompare(secondCountry.label);
    })
    .reduce<Record<IntlTelKeyType, IntlTelEntryType>>(
      // eslint-disable-next-line no-restricted-syntax
      (localeAcc, { key, ...rest }) => {
        localeAcc[key] = rest;

        return localeAcc;
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      {} as Record<IntlTelKeyType, IntlTelEntryType>
    );

  return acc;
}, {});

export { countriesData, defaultIntlTelCode, intlTelList };
