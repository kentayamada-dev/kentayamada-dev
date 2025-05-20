type EntriesType<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const getEntries = <T extends Record<string, unknown>>(obj: T): EntriesType<T> => {
  return (Object.keys(obj) as (keyof T)[]).map((key) => {
    return [key, obj[key]];
  });
};

export { getEntries };
