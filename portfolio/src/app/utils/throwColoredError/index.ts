type ColorNameType = 'red';

const colorCodes: Record<ColorNameType, string> = {
  red: '31'
};

const throwColoredError = (message: string, color: ColorNameType, info?: string): never => {
  const stack = new Error().stack?.split('\n')[2]?.match(/src\/.*:\d+:\d+/u)?.[0];

  // eslint-disable-next-line no-undefined
  throw new Error(`\x1b[1;${colorCodes[color]}m${message}${stack === undefined ? '' : ` (${stack})`}\x1b[0m${info === undefined ? '' : `\n${info}`}`);
};

export { throwColoredError };
