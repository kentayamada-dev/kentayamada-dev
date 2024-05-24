import type { constants } from '@/constants';

type Themes = typeof constants.themes;
type Theme = Themes[number];

export type { Theme, Themes };
