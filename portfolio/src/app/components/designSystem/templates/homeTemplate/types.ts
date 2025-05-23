import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';
import type { IntroProps } from './intro/types';

type HomeTemplateProps = IntroProps & {
  coverImage: {
    title: string;
    url: string;
  };
  locale: LocaleKeyType;
};

type HomeTemplateType = ComponentType<HomeTemplateProps>;

export type { HomeTemplateType };
