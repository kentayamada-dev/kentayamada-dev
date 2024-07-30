import type { ReadonlyComponentType } from '@/types/components';

type LogoProps = {
  isJapanese: boolean;
};

type LogoType = ReadonlyComponentType<LogoProps>;

export type { LogoType };
