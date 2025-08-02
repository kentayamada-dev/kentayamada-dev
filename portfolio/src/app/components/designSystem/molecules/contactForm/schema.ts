import { z } from 'zod';
import { intlTelList } from '@/constants/intlTel';
import { isValidPhoneNumber } from '@/lib/libphonenumber';
import { getKeysFromObject } from '@/utils/getKeysFromObject';
import type { IntlTelKeyType } from '@/constants/intlTel/types';

const contactSchema = z
  .object({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    countryCode: z.enum([...getKeysFromObject(intlTelList)] as [IntlTelKeyType, ...IntlTelKeyType[]]),
    email: z.email(),
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    message: z.string().nonempty(),
    phoneNumber: z.string()
  })
  .refine(
    (args) => {
      const { countryCode, phoneNumber } = args;

      if (!phoneNumber) {
        return true;
      }

      return isValidPhoneNumber(`${intlTelList[countryCode].code} ${phoneNumber}`, countryCode);
    },
    {
      path: ['phoneNumber']
    }
  )
  .transform((args) => {
    const { countryCode, phoneNumber, ...rest } = args;

    return {
      ...rest,
      countryCode,
      phoneNumber: phoneNumber && `${intlTelList[countryCode].code} ${phoneNumber}`
    };
  });

export { contactSchema };
