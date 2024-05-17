import { getUpdatedPluginRules, turnOffCommonKeys } from './utils.js';
import eslintPlugin from 'eslint';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

const eslintPrefix = 'eslint';
const customRules = {
  'require-jsdoc': 'off',
  'array-element-newline': ['error', 'never'],
  'indent-legacy': 'off',
  'padded-blocks': ['error', 'never'],
  'arrow-body-style': ['error', 'always'],
  'sort-imports': 'off',
  'no-undef': 'off',
  'one-var': ['error', 'never'],
  'quote-props': ['error', 'always'],
  'function-call-argument-newline': ['error', 'never'],
  'max-len': ['error', { 'code': 120 }]
};
const eslintPluginRules = Object.fromEntries(
  [...new eslintPlugin.Linter().getRules().entries()].map(([key, rule]) => [key, rule])
);

const typescriptPluginRules = typescriptPlugin.rules;
const eslintRules = getUpdatedPluginRules(eslintPrefix, eslintPluginRules, {
  ...customRules,
  ...turnOffCommonKeys(eslintPluginRules, typescriptPluginRules)
});

export { eslintRules };
