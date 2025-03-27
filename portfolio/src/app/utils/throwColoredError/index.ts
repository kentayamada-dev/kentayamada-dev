type ColorNameType = 'red';

const colorCodes: Record<ColorNameType, string> = {
  red: '31'
};

const throwColoredError = (message: string, color: ColorNameType, info?: string): never => {
  throw new Error(`\x1b[1;${colorCodes[color]}m${message}\x1b[0m\n${info}`);
};

export { throwColoredError };
