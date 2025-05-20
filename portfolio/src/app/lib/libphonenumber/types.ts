import type { CountryCode } from 'libphonenumber-js/max';

type IsValidPhoneNumberType = (phoneNumberString: string, countryCode: CountryCode) => boolean;

export type { IsValidPhoneNumberType };
