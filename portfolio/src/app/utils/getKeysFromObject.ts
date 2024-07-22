const getKeysFromObject = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof typeof obj)[];
};

export { getKeysFromObject };
