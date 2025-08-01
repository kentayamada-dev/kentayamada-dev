'use server';

import { auth, sheets } from '@googleapis/sheets';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { envServer } from '@/constants/env/server';
import { X_REAL_IP_HEADER } from '@/constants/navigation';
import { siteVerifySchema } from './schema';
import type { ContactFormSchemaType, ContactFormStateType } from '@/components/designSystem/molecules/contactForm/types';

const EMAIL_FROM = 'portfolio@notify.kentayamada.dev';
const EMAIL_TO = 'contact@kentayamada.dev';
const EMAIL_SUBJECT = 'Website';
const SPREADSHEET_ID = '1T5v7iPsLdU4CxQRMlBPi_PhqaeH7nIxs6a3B8Xg0NgU';
const resend = new Resend(envServer.RESEND_API_KEY);

const authClient = new auth.GoogleAuth({
  credentials: {
    /* eslint-disable camelcase */
    client_email: envServer.GOOGLE_CLIENT_EMAIL,
    private_key: envServer.GOOGLE_PRIVATE_KEY.replace(/\\n/gu, '\n')
    /* eslint-enable camelcase */
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      body: new URLSearchParams({
        remoteip: (await headers()).get(X_REAL_IP_HEADER) ?? '',
        response: token,
        secret: envServer.RECAPTCHA_SECRETKEY
      }),
      method: 'POST'
    });

    if (!res.ok) {
      return false;
    }

    const data = siteVerifySchema.parse(await res.json());

    return data.success;
  } catch {
    return false;
  }
};

const createPost = async (formData: ContactFormSchemaType): Promise<ContactFormStateType> => {
  const data = {
    countryCode: {
      label: 'Country Code',
      value: formData.phoneNumber ? formData.countryCode : ''
    },
    phoneNumber: {
      label: 'Phone Number',
      value: formData.phoneNumber
    },
    // eslint-disable-next-line sort-keys
    email: {
      label: 'Email',
      value: formData.email
    },
    firstName: {
      label: 'First Name',
      value: formData.firstName
    },
    lastName: {
      label: 'Last Name',
      value: formData.lastName
    },
    message: {
      label: 'Message',
      value: formData.message
    }
  };

  await resend.emails.send({
    from: EMAIL_FROM,
    html: `<div>
            <h2 style="margin: 0;">Info:</h2>
            <p style="margin: 0;">${data.firstName.value} ${data.lastName.value} &lt;${data.email.value}&gt;</p>
            <br>
            <h2 style="margin: 0;">Message:</h2>
            <p style="margin: 0;">${data.message.value.replace(/\r?\n/gu, '<br>')}</p>
          </div>`,
    subject: EMAIL_SUBJECT,
    text: `Info:\n${data.firstName.value} ${data.lastName.value} <${data.email.value}>\n\nMessage:\n${data.message.value}`,
    to: [EMAIL_TO]
  });

  await sheets({
    auth: authClient,
    version: 'v4'
  }).spreadsheets.values.append({
    range: 'data',
    requestBody: {
      values: [
        [
          data.countryCode.value,
          data.phoneNumber.value && `=HYPERLINK("https://call.ctrlq.org/${formData.phoneNumber.replace(/\s/gu, '')}", "${formData.phoneNumber}")`,
          `=HYPERLINK("mailto:${data.email.value}", "${data.email.value}")`,
          data.firstName.value,
          data.lastName.value,
          data.message.value
        ]
      ]
    },
    spreadsheetId: SPREADSHEET_ID,
    valueInputOption: 'USER_ENTERED'
  });

  return {};
};

export { createPost, verifyRecaptcha };
