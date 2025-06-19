const isDefined = <T>(value: T | null | undefined): value is T => {
  // eslint-disable-next-line no-undefined
  return value !== null && value !== undefined;
};

export { isDefined };
