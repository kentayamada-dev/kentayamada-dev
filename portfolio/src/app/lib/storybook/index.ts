const customViewports = {
  fullHd: {
    name: 'Full HD',
    styles: {
      height: '1080px',
      width: '1920px'
    }
  },
  iPadAir: {
    name: 'iPad Air',
    styles: {
      height: '1180px',
      width: '820px'
    }
  },
  iPhone14ProMax: {
    name: 'iPhone 14 Pro Max',
    styles: {
      height: '932px',
      width: '430px'
    }
  }
} as const;

const createViewportKeys = <T extends Record<string, unknown>>(obj: T): { [K in keyof T]: K } => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[key as keyof T] = key;

      return acc;
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    {} as { [K in keyof T]: K }
  );
};

const viewportKeys = createViewportKeys(customViewports);

export { customViewports, viewportKeys };
