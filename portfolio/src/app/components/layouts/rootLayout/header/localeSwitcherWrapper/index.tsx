'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/constants/i18n';
import { setLocaleCookie } from '@/lib/cookies-next';
import { LocaleSwitcher } from './localeSwitcher';
import type { LocaleSwitcherWrapperType } from './types';
import type { StateSetterType } from '@/types/components';

const LocaleSwitcherWrapper: LocaleSwitcherWrapperType = (props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange: StateSetterType<string> = (newLocale) => {
    setLocaleCookie(newLocale.toString());

    const newPath = pathname.replace(`/${props.lang}`, `/${newLocale.toString()}`);

    router.replace(newPath, { scroll: false });
  };

  return <LocaleSwitcher currentLocaleKey={props.lang} handleLocale={handleChange} items={locales} />;
};

export { LocaleSwitcherWrapper };
