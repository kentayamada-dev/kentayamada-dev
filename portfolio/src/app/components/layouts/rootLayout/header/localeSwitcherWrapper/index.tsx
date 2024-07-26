'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCurrentLocale } from 'next-i18n-router/client';
import { i18nConfig, localeCookie, locales } from '@/constants/locales';
import { LocaleSwitcher } from './localeSwitcher';
import type { JSXElementType, StateSetterType } from '@/types/components';

const LocaleSwitcherWrapper = (): JSXElementType => {
  const currentPathname = usePathname();
  const router = useRouter();
  const locale = useCurrentLocale(i18nConfig);

  const handleChange: StateSetterType<string> = (newLocale) => {
    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    const date = new Date();

    date.setTime(date.getTime() + oneMonth);
    document.cookie = `${localeCookie}=${newLocale.toString()};expires=${date.toUTCString()};path=/`;

    if (locale === i18nConfig.defaultLocale) {
      router.push(`/${newLocale.toString()}${currentPathname}`);
    } else {
      router.push(currentPathname.replace(`/${locale}`, `/${newLocale.toString()}`));
    }

    router.refresh();
  };

  return <LocaleSwitcher currentLocaleKey={locale} handleLocale={handleChange} items={locales} />;
};

export { LocaleSwitcherWrapper };
