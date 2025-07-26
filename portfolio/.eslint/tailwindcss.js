import tailwindcssPlugin from 'eslint-plugin-better-tailwindcss';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const tailwindcssPrefix = 'better-tailwindcss';

const tailwindcssRule = addPrefixRule(tailwindcssPrefix, {
  'enforce-consistent-line-wrapping': ['error', { group: 'newLine', preferSingleLine: true, printWidth: 1000 }],
  'no-unregistered-classes': [
    'error',
    {
      ignore: ['not-prose']
    }
  ],
  // https://github.com/schoero/eslint-plugin-better-tailwindcss/issues/172
  'enforce-consistent-class-order': 'off'
});

const tailwindcssExtend = getExtend(tailwindcssPrefix, tailwindcssPlugin.rules);

validateRules(tailwindcssExtend, tailwindcssRule);

export { tailwindcssPrefix, tailwindcssExtend, tailwindcssRule, tailwindcssPlugin };
