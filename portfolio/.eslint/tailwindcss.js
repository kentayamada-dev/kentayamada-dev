import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const tailwindcssPrefix = 'tailwindcss';

const tailwindcssRule = addPrefixRule(tailwindcssPrefix, {
  'no-arbitrary-value': 'off'
});

const tailwindcssExtend = getExtend(tailwindcssPrefix, tailwindcssPlugin.rules);

validateRules(tailwindcssExtend, tailwindcssRule);

export { tailwindcssPrefix, tailwindcssExtend, tailwindcssRule, tailwindcssPlugin };
