import type { ComponentType } from '@/types/components';

type IntroProps = {
  paragraph: string;
  subtitle: string;
  title: string;
};

type IntroType = ComponentType<IntroProps>;

export type { IntroProps, IntroType };
