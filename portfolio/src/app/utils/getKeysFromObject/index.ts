const getKeysFromObject = <T extends object>(obj: T): (keyof T)[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return Object.keys(obj) as (keyof typeof obj)[];
};

export { getKeysFromObject };
