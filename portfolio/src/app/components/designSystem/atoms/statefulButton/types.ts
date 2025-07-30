import type { ComponentType } from '@/types/components';
import type { STATEFUL_BUTTON_STATUS } from '.';

type StatefulButtonProps = {
  status: (typeof STATEFUL_BUTTON_STATUS)[number];
  title: string;
};

type StatefulButtonType = ComponentType<StatefulButtonProps>;

export type { StatefulButtonProps, StatefulButtonType };
