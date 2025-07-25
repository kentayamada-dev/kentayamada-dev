'use client';

import { useEffect, useState } from 'react';
import { Switcher } from '@/components/designSystem/molecules';
import { dictionaries } from '@/constants/i18n';
import { useNextTheme } from '@/lib/next-themes';
import type { ThemeSwitcherWrapperType } from './types';

const ThemeSwitcherWrapper: ThemeSwitcherWrapperType = (props) => {
  const { options, setTheme: handleSetTheme, theme, themeKey } = useNextTheme(props.locale);
  const [isMounted, setIsMounted] = useState(false);
  const { themeSwitcherLabel } = dictionaries[props.locale].labels;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Switcher
      buttonIcon={theme.icon}
      buttonLabel={themeSwitcherLabel}
      isMounted={isMounted}
      onChange={handleSetTheme}
      options={options}
      value={themeKey}
    />
  );
};

export { ThemeSwitcherWrapper };
