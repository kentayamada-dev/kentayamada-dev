import type data from './data.json';

type IntlTelType = typeof data;

type IntlTelKeyType = keyof IntlTelType;

type IntlTelEntryType = IntlTelType[IntlTelKeyType] & { label: string };

export type { IntlTelEntryType, IntlTelKeyType };
