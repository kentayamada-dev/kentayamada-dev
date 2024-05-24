import { getUpdatedPluginRules, turnOffCommonKeys } from './utils.js';
import eslintPlugin from 'eslint';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

const eslintPrefix = 'eslint';
const customRules = {
  'new-cap': ['error', { 'capIsNew': false }],
  'camelcase': ['error', { 'ignoreImports': true }],
  'require-jsdoc': 'off',
  'array-element-newline': ['error', 'never'],
  'indent-legacy': 'off',
  'padded-blocks': ['error', 'never'],
  'arrow-body-style': ['error', 'always'],
  'sort-imports': [
    'error',
    {
      ignoreDeclarationSort: true
    }
  ],
  'no-undef': 'off',
  'one-var': ['error', 'never'],
  'quote-props': ['error', 'consistent-as-needed', { 'keywords': true, 'unnecessary': false }],
  'function-call-argument-newline': ['error', 'never'],
  'max-len': ['error', { 'code': 120 }],
  'max-lines-per-function': ['error', 100]
};

const eslintPluginRules = Object.fromEntries(
  [...new eslintPlugin.Linter().getRules().entries()].map(([key, rule]) => [key, rule])
);

const eslintRules = getUpdatedPluginRules(eslintPrefix, eslintPluginRules, {
  ...customRules,
  ...turnOffCommonKeys(eslintPluginRules, typescriptPlugin.rules)
});

export { eslintRules };
