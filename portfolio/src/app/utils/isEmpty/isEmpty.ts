const isEmpty = (value: Record<string, unknown> | unknown[] | string): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'string') {
    return value.length === 0;
  }

  return false;
};

export { isEmpty };
