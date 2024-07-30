import { setCookie } from 'cookies-next';
import { localeCookieName } from '@/constants/i18n';
import type { OptionsType } from 'cookies-next/lib/types';

const setLocaleCookie = (value: string, options?: OptionsType): void => {
  setCookie(localeCookieName, value, {
    // One month limit
    maxAge: 2592000,
    path: '/',
    secure: true,
    ...options
  });
};

export { setLocaleCookie };
