const getTypedKey = <T extends Readonly<Record<string, unknown>>>(optionKey: string | undefined, options: T, defaultKey: keyof T): keyof T => {
  // eslint-disable-next-line no-undefined
  return optionKey !== undefined && optionKey in options ? (optionKey as keyof T) : defaultKey;
};

export { getTypedKey };
