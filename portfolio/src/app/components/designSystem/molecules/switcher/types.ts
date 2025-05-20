import type { ListboxProps } from '@headlessui/react';
import type { ComponentType, ConditionalPickType, IconType } from '@/types/components';

type SwitcherProps = ConditionalPickType<ListboxProps, 'onChange' | 'value'> & {
  buttonIcon: IconType;
  buttonLabel: string;
  isMounted: boolean;
  options: Record<
    string,
    {
      icon: IconType;
      name: string;
    }
  >;
};

type SwitcherType = ComponentType<SwitcherProps>;

export type { SwitcherProps, SwitcherType };
