'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { themeOptions } from '@/constants/themes';
import { ThemeSwitcher } from './themeSwitcher';
import type { ThemeSwitcherWrapperType } from './types';

const ThemeSwitcherWrapper: ThemeSwitcherWrapperType = (props) => {
  const { setTheme, theme: currentThemeKey } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <ThemeSwitcher currentThemeKey={currentThemeKey} handleTheme={setTheme} isMounted={isMounted} locale={props.locale} themes={themeOptions} />;
};

export { ThemeSwitcherWrapper };
