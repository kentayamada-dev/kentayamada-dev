const isString = (value: string | undefined): value is string => {
  return typeof value === 'string';
};

export { isString };
