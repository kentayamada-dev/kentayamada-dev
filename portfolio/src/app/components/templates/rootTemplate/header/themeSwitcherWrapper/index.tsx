'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { themeOptions } from '@/constants/themes';
import { ThemeSwitcher } from './themeSwitcher';
import type { ThemeSwitcherWrapperType } from './types';

const ThemeSwitcherWrapper: ThemeSwitcherWrapperType = (props) => {
  const { setTheme, theme: currentThemeKey } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <ThemeSwitcher currentThemeKey={currentThemeKey} handleTheme={setTheme} isMounted={mounted} items={themeOptions} lang={props.lang} />;
};

export { ThemeSwitcherWrapper };
