import type { ComponentType } from '@/types/components';
import type { ArticlesListProps } from './articlesList/types';
import type { IntroProps } from './intro/types';

type HomeTemplateProps = ArticlesListProps &
  IntroProps & {
    coverImage: {
      title: string;
      url: string;
    };
  };

type HomeTemplateType = ComponentType<HomeTemplateProps>;

export type { HomeTemplateType };
