const isPathStartingWith = (path: string, basePath: string): boolean => {
  const regex = new RegExp(`^\\/${basePath}(\\/|$)`, 'u');

  return regex.test(path);
};

export { isPathStartingWith };
