const isValueInArray = <T>(value: unknown, array: readonly T[]): value is T => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return array.includes(value as T);
};

export { isValueInArray };
