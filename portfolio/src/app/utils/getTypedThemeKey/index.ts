import { themeOptions } from '@/constants/themes';
import { getTypedKey } from '../getTypedKey';
import type { GetTypedThemeKeyType } from './types';
import type { ThemeOptionKeyType } from '@/constants/themes/types';

const getTypedThemeKey: GetTypedThemeKeyType = (themeKey) => {
  return getTypedKey<ThemeOptionKeyType>(themeKey, themeOptions, 'system');
};

export { getTypedThemeKey };
