import type { DeepReadonlyType } from '@/types/components';

type UseMediaQueryProps = DeepReadonlyType<{
  callback: VoidFunction;
  query: string;
}>;

type UseMediaQueryType = (props: UseMediaQueryProps) => void;

export type { UseMediaQueryType };
