'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switcher } from '@/components/designSystem/molecules';
import { dictionaries } from '@/constants/i18n';
import { defaultTheme, themeOptions } from '@/constants/themes';
import { getTypedKey } from '@/utils';
import type { ThemeSwitcherWrapperType } from './types';

const ThemeSwitcherWrapper: ThemeSwitcherWrapperType = (props) => {
  const { setTheme, theme: currentThemeKey } = useTheme();
  const theme = themeOptions(props.locale);
  const [isMounted, setIsMounted] = useState(false);
  const typedCurrentThemeKey = getTypedKey(currentThemeKey, theme, defaultTheme);
  const currentTheme = theme[typedCurrentThemeKey];
  const { themeSwitcherLabel } = dictionaries[props.locale].labels;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Switcher
      buttonIcon={currentTheme.icon}
      buttonLabel={themeSwitcherLabel}
      isMounted={isMounted}
      onChange={setTheme}
      options={theme}
      value={typedCurrentThemeKey}
    />
  );
};

export { ThemeSwitcherWrapper };
