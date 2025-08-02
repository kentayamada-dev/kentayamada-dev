type ColorNameType = 'red';

const colorCodes: Record<ColorNameType, string> = {
  red: '31'
};

const throwColoredError = (message: string, color: ColorNameType, info = ''): never => {
  const stack = ` (${new Error().stack?.split('\n')[2]?.match(/src\/[^\s:]*/u)?.[0]})`;

  throw new Error(`\x1b[1;${colorCodes[color]}m${message}${stack}\x1b[0m\n${info}`);
};

export { throwColoredError };
