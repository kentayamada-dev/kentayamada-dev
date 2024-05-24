'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { constants } from '@/constants';
import { ThemeSwitch } from './theme-switch';
import type { ThemeSwitchPropsType } from './theme-switch/types';
import type { JSXElement } from '@/types/components';
import type { Theme } from '@/types/constants';

export const ThemeSwitchWrapper = (): JSXElement => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const onChangeHandler: ThemeSwitchPropsType['onChangeHandler'] = (event) => {
    setTheme(event.currentTarget.value);
    event.currentTarget.blur();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>Loading...</>;
  }

  return <ThemeSwitch onChangeHandler={onChangeHandler} theme={theme as Theme} themes={constants.themes} />;
};
