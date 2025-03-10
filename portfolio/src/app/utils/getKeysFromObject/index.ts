const getKeysFromObject = <T extends Record<string, unknown>>(obj: T): Extract<keyof T, string>[] => {
  return Object.keys(obj).filter((key): key is Extract<keyof T, string> => {
    return key in obj;
  });
};

export { getKeysFromObject };
