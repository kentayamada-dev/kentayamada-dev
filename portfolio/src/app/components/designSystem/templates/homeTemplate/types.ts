import type { CareerListProps } from '@/components/designSystem/molecules';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType, StrictOmitType } from '@/types/components';

type HomeTemplateProps = StrictOmitType<CareerListProps, 'labels'> & {
  coverImage: {
    title: string;
    url: string;
  };
  locale: LocaleKeyType;
  title: {
    main: string;
    sub: string;
  };
};

type HomeTemplateType = ComponentType<HomeTemplateProps>;

export type { HomeTemplateType };
