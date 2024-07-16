import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import type { ThemeOptionsType } from './types';

const themeOptions = {
  dark: { icon: MoonIcon, name: 'Dark' },
  light: { icon: SunIcon, name: 'Light' },
  system: { icon: ComputerDesktopIcon, name: 'System' }
} as const satisfies ThemeOptionsType;

export { themeOptions };
