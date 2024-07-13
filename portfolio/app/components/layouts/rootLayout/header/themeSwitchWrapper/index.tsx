'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { themeOptions } from '@/constants/themes';
import { ThemeSwitch } from './themeSwitch';
import type { JSXElementType } from '@/types/components';

const ThemeSwitchWrapper = (): JSXElementType => {
  const { setTheme, theme: currentThemeKey } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeSwitch currentThemeKey={currentThemeKey} handleTheme={setTheme} isMounted={mounted} items={themeOptions} />
  );
};

export { ThemeSwitchWrapper };
