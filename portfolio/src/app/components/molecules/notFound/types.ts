import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type NotFoundProps = {
  lang: LocaleKeyType;
  mainMessage: string;
  subMessage: string;
};

type NotFoundType = ComponentType<NotFoundProps>;

export type { NotFoundType };
