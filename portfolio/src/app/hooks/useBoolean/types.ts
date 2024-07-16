import type { StateSetterType } from '@/types/components';

type UseBooleanReturn = Readonly<{
  setValue: StateSetterType<boolean>;
  toggle: VoidFunction;
  value: boolean;
}>;

type UseBooleanProps = Readonly<{
  defaultValue: boolean;
}>;

type UseBooleanType = (props: UseBooleanProps) => UseBooleanReturn;

export type { UseBooleanType };
