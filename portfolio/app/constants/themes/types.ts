import type { IconType } from '@/types/components';

type ThemeOptionType = {
  icon: IconType;
  name: string;
};

type ThemeOptionKeyType = 'dark' | 'light' | 'system';

type ThemeOptionsType = Record<ThemeOptionKeyType, ThemeOptionType>;

export type { ThemeOptionKeyType, ThemeOptionsType };
