import { z } from 'zod';
import { intlTelList } from '@/constants/intlTel';
import { isValidPhoneNumber } from '@/lib/libphonenumber';
import { getKeysFromObject } from '@/utils';
import type { IntlTelKeyType } from '@/constants/intlTel/types';

const siteVerifySchema = z.object({
  action: z.string(),
  // eslint-disable-next-line camelcase
  challenge_ts: z.string(),
  hostname: z.string(),
  score: z.number(),
  success: z.boolean()
});

const contactSchema = z
  .object({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    countryCode: z.enum([...getKeysFromObject(intlTelList)] as [IntlTelKeyType, ...IntlTelKeyType[]]),
    email: z.string().email(),
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    message: z.string().nonempty(),
    phoneNumber: z.string().nonempty()
  })
  .refine(
    (args) => {
      const { countryCode, phoneNumber } = args;

      return isValidPhoneNumber(`${intlTelList[countryCode].code} ${phoneNumber}`, countryCode);
    },
    {
      path: ['phoneNumber']
    }
  )
  .transform((args) => {
    const { countryCode, phoneNumber, ...rest } = args;
    const formattedPhoneNumber = `${intlTelList[countryCode].code} ${phoneNumber}`;

    return {
      ...rest,
      countryCode,
      phoneNumber: formattedPhoneNumber
    };
  });

export { contactSchema, siteVerifySchema };
