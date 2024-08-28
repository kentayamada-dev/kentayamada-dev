const getStorybookImageUrl = (env: 'development' | 'production', imageFileName: string): string => {
  if (env === 'development') {
    return `/${imageFileName}`;
  }

  return `/storybook/${imageFileName}`;
};

export { getStorybookImageUrl };
