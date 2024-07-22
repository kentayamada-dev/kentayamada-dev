import { ComputerIcon, MoonIcon, SunIcon } from '@/components/icons';
import type { ThemeOptionKeyType, ThemeOptionsType } from './types';

const themeOptions = {
  dark: { icon: MoonIcon, name: 'Dark' },
  light: { icon: SunIcon, name: 'Light' },
  system: { icon: ComputerIcon, name: 'System' }
} as const satisfies ThemeOptionsType;

const defaultTheme: ThemeOptionKeyType = 'system';

export { defaultTheme, themeOptions };
