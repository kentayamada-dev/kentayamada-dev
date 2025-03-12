'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { themeOptions } from '@/constants/themes';
import { ThemeSwitcher } from './themeSwitcher';
import type { JSXElementType } from '@/types/components';

const ThemeSwitcherWrapper = (): JSXElementType => {
  const { setTheme, theme: currentThemeKey } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <ThemeSwitcher currentThemeKey={currentThemeKey} handleTheme={setTheme} isMounted={mounted} items={themeOptions} />;
};

export { ThemeSwitcherWrapper };
