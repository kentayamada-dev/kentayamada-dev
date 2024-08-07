import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';

const tailwindcssPrefix = 'tailwindcss';
const customRules = {
  'no-arbitrary-value': 'off'
};
const tailwindcssRules = getKeyUpdatedObject(
  getUpdatedPluginRules(tailwindcssPrefix, tailwindcssPlugin.rules, customRules),
  tailwindcssPrefix
);

export { tailwindcssPrefix, tailwindcssPlugin, tailwindcssRules };
