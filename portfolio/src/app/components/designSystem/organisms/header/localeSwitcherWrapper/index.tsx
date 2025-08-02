'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Switcher } from '@/components/designSystem/molecules/switcher';
import { dictionaries, locales } from '@/constants/i18n';
import { setLocaleCookie } from '@/lib/cookies-next';
import type { SwitcherProps } from '@/components/designSystem/molecules/switcher/types';
import type { LocaleSwitcherWrapperType } from './types';

const LocaleSwitcherWrapper: LocaleSwitcherWrapperType = (props) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocaleObj = locales[props.locale];
  const { localeSwitcherLabel } = dictionaries[props.locale].labels;

  const handleChange: SwitcherProps['onChange'] = (newLocale) => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      await setLocaleCookie(newLocale);

      const newPath = pathname.replace(`/${props.locale}`, `/${newLocale}`);

      router.replace(newPath, { scroll: false });
    })();
  };

  return (
    <Switcher
      buttonIcon={currentLocaleObj.icon}
      buttonLabel={localeSwitcherLabel}
      isMounted
      onChange={handleChange}
      options={locales}
      value={props.locale}
    />
  );
};

export { LocaleSwitcherWrapper };
