type UseMediaQueryProps = Readonly<{
  callback: VoidFunction;
  query: string;
}>;

type UseMediaQueryType = (props: UseMediaQueryProps) => void;

export type { UseMediaQueryType };
