import { parsePhoneNumberFromString } from 'libphonenumber-js';
import type { IsValidPhoneNumberType } from './types';

const isValidPhoneNumber: IsValidPhoneNumberType = (phoneNumberString, countryCode) => {
  const phoneNumber = parsePhoneNumberFromString(phoneNumberString, {
    defaultCountry: countryCode,
    extract: false
  });

  if (!phoneNumber) {
    return false;
  }

  if (phoneNumber.country !== countryCode) {
    return false;
  }

  return phoneNumber.isValid();
};

export { isValidPhoneNumber };
