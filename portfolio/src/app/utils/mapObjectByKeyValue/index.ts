// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapObjectByKeyValue = <T extends Record<string, any>>(
  items: Record<string, T>,
  keyProp: keyof T,
  valueProp: keyof T
): Record<T[keyof T], T[keyof T]> => {
  return Object.entries(items).reduce(
    (acc: Record<T[keyof T], T[keyof T]>, [_, item]) => {
      acc[item[keyProp]] = item[valueProp];

      return acc;
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    {} as Record<T[keyof T], T[keyof T]>
  );
};

export { mapObjectByKeyValue };
