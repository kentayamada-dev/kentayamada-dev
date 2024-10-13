import type { themeOptions } from '.';
import type { IconType } from '@/types/components';

type ThemeOptionType = {
  icon: IconType;
  name: string;
};

type ThemeOptionKeyType = keyof typeof themeOptions;

type ThemeOptionsType = Record<string, ThemeOptionType>;

export type { ThemeOptionKeyType, ThemeOptionsType };
