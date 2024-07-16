import type { ScreenOptionsType } from './types';

const screenOptions = {
  md: 1280,
  sm: 770
} as const satisfies ScreenOptionsType;

export { screenOptions };
