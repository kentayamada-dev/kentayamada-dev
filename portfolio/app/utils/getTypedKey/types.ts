type GetTypedKeyType = <T extends string>(
  optionKey: string | undefined,
  options: Record<T, unknown>,
  defaultKey: T
) => T;

export type { GetTypedKeyType };
