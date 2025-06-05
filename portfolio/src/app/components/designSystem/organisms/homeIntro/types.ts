import type { ComponentType } from '@/types/components';

type HomeIntroProps = {
  paragraph: string;
  subtitle: string;
  title: string;
};

type HomeIntroType = ComponentType<HomeIntroProps>;

export type { HomeIntroType };
