import { getUpdatedPluginRules, turnOffCommonKeys } from './utils.js';
import eslintPlugin from 'eslint';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

const eslintPrefix = 'eslint';
const customRules = {
  'capitalized-comments': ['error', 'always', { 'ignorePattern': 'prettier-ignore' }],
  'max-statements': 'off',
  'no-process-env': 'off',
  'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 5 }],
  'id-length': ['error', { 'exceptions': ['_'] }],
  'function-paren-newline': ['error', 'consistent'],
  'dot-location': 'off',
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
  'array-bracket-newline': ['error', 'consistent'],
  'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
  'multiline-ternary': ['error', 'never'],
  'no-ternary': 'off',
  'new-cap': ['error', { 'capIsNew': false }],
  'camelcase': ['error', { 'ignoreImports': true }],
  'require-jsdoc': 'off',
  'callback-return': 'off',
  'array-element-newline': ['error', 'consistent'],
  'indent-legacy': 'off',
  'padded-blocks': ['error', 'never'],
  'arrow-body-style': ['error', 'always'],
  'sort-imports': [
    'error',
    {
      'ignoreDeclarationSort': true
    }
  ],
  'no-undef': 'off',
  'one-var': ['error', 'never'],
  'quote-props': ['error', 'consistent-as-needed', { 'keywords': true, 'unnecessary': false }],
  'function-call-argument-newline': ['error', 'consistent'],
  'max-len': [
    'error',
    {
      'code': 120,
      'ignorePattern': 'className=[\'"][^\'"]+[\'"]|className=\\{`[^`]+`\\}|d=[\'"][^\'"]+[\'"]',
      'ignoreComments': true,
      'ignoreUrls': true
    }
  ],
  'max-lines-per-function': 'off',
  'indent': [
    'error',
    2,
    {
      'SwitchCase': 1,
      'ignoredNodes': ['TSTypeParameterInstantiation']
    }
  ],
  'object-curly-spacing': ['error', 'always'],
  'quotes': ['error', 'single'],
  'space-before-function-paren': [
    'error',
    {
      'anonymous': 'never',
      'asyncArrow': 'always',
      'named': 'never'
    }
  ],
  'comma-dangle': [
    'error',
    {
      'arrays': 'never',
      'objects': 'never',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never'
    }
  ],
  'no-extra-parens': ['error', 'all', { 'ignoreJSX': 'all', 'nestedBinaryExpressions': false }]
};

const eslintPluginRules = Object.fromEntries(
  [...new eslintPlugin.Linter().getRules().entries()].map(([key, rule]) => [key, rule])
);

const eslintRules = getUpdatedPluginRules(eslintPrefix, eslintPluginRules, {
  ...customRules,
  ...turnOffCommonKeys(eslintPluginRules, typescriptPlugin.rules)
});

export { eslintRules };
