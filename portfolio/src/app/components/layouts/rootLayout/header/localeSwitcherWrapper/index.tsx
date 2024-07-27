'use client';

import { setCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import { localeCookie, locales } from '@/constants/locales';
import { LocaleSwitcher } from './localeSwitcher';
import type { LocaleSwitcherWrapperType } from './types';
import type { StateSetterType } from '@/types/components';

const LocaleSwitcherWrapper: LocaleSwitcherWrapperType = (props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange: StateSetterType<string> = (newLocale) => {
    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    const date = new Date();

    date.setTime(date.getTime() + oneMonth);

    setCookie(localeCookie, newLocale.toString(), {
      expires: date,
      path: '/',
      secure: true
    });

    const newPath = pathname.replace(`/${props.lang}`, `/${newLocale.toString()}`);

    router.replace(newPath);
  };

  return <LocaleSwitcher currentLocaleKey={props.lang} handleLocale={handleChange} items={locales} />;
};

export { LocaleSwitcherWrapper };
