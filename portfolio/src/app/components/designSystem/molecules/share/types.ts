import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ShareProps = {
  locale: LocaleKeyType;
  title: string;
  url: string;
};

type ShareType = ComponentType<ShareProps>;

export type { ShareProps, ShareType };
