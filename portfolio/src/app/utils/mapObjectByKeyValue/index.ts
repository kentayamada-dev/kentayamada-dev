const mapObjectByKeyValue = <T extends Record<string, unknown>, V extends keyof T>(
  items: Record<string, T>,
  keyProp: keyof T,
  valueProp: V
): Record<string, T[V]> => {
  return Object.entries(items).reduce<Record<string, T[V]>>((acc, [_, item]) => {
    const keyCandidate = item[keyProp];
    const keyAsString = String(keyCandidate);

    acc[keyAsString] = item[valueProp] as T[V];

    return acc;
  }, {});
};

export { mapObjectByKeyValue };
