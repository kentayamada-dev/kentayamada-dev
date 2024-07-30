import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type FooterProps = {
  lang: LocaleKeyType;
};

type FooterType = ReadonlyComponentType<FooterProps>;

export type { FooterType };
