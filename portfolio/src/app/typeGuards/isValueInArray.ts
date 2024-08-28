const isValueInArray = <T>(value: unknown, array: readonly T[]): value is T => {
  return array.includes(value as T);
};

export { isValueInArray };
