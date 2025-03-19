import eslint from '@eslint/js';
import { validateRules } from './utils.js';

const eslintExtend = eslint.configs.all;

const eslintRule = {
  'func-style': ['error', 'expression'],
  'one-var': ['error', 'never'],
  'arrow-body-style': ['error', 'always'],
  'capitalized-comments': ['error', 'always', { 'ignorePattern': 'prettier-ignore' }],
  'sort-imports': [
    'error',
    {
      'ignoreDeclarationSort': true
    }
  ],
  'new-cap': ['error', { 'capIsNew': false }],
  'camelcase': ['error', { 'ignoreImports': true }],
  'id-length': ['error', { 'exceptions': ['_'] }],
  'no-restricted-syntax': [
    'error',
    {
      'selector': 'FunctionDeclaration > ObjectPattern',
      'message': 'Destructuring in function arguments is not allowed.'
    },
    {
      'selector': 'FunctionExpression > ObjectPattern',
      'message': 'Destructuring in function arguments is not allowed.'
    },
    {
      'selector': 'ArrowFunctionExpression > ObjectPattern',
      'message': 'Destructuring in function arguments is not allowed.'
    }
  ],
  'max-lines': 'off',
  'max-lines-per-function': 'off',
  'max-statements': 'off',
  'no-ternary': 'off',
  'no-duplicate-imports': 'off'
};

validateRules(eslintExtend, eslintRule);

export { eslintRule, eslintExtend };
