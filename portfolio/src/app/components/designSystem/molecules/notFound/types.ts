import type { ComponentType } from '@/types/components';

type NotFoundProps = {
  homeHref: string;
  label: string;
  message: {
    main: string;
    sub: string;
  };
};

type NotFoundType = ComponentType<NotFoundProps>;

export type { NotFoundType };
