import stylisticPlugin from '@stylistic/eslint-plugin';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const stylisticPrefix = '@stylistic';

const stylisticRule = addPrefixRule(stylisticPrefix, {
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: 'return' },
    { blankLine: 'always', prev: '*', next: 'block-like' },
    { blankLine: 'always', prev: ['const', 'let'], next: '*' },
    { blankLine: 'never', prev: ['const', 'let'], next: ['const', 'let'] },
    { blankLine: 'always', prev: '*', next: 'multiline-const' },
    { blankLine: 'always', prev: 'multiline-const', next: '*' },
    { blankLine: 'never', prev: 'import', next: 'import' },
    { blankLine: 'always', prev: 'type', next: 'type' }
  ],
  'dot-location': ['error', 'property'],
  'indent': [
    'error',
    2,
    {
      'SwitchCase': 1,
      'ignoredNodes': ['ConditionalExpression']
    }
  ],
  'object-curly-spacing': ['error', 'always'],
  'quotes': ['error', 'single'],
  'space-before-function-paren': [
    'error',
    {
      'anonymous': 'always',
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
  'no-extra-parens': ['error', 'all', { 'ignoreJSX': 'all', 'nestedBinaryExpressions': false }],
  'quote-props': ['error', 'consistent-as-needed', { 'keywords': true, 'unnecessary': false }],
  'function-call-argument-newline': ['error', 'consistent'],
  'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 5 }],
  'function-paren-newline': ['error', 'consistent'],
  'array-bracket-newline': ['error', 'consistent'],
  'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
  'multiline-ternary': ['error', 'never', { 'ignoreJSX': true }],
  'array-element-newline': ['error', 'consistent'],
  'max-len': [
    'error',
    {
      'code': 150,
      'ignorePattern': 'className=[\'"][^\'"]+[\'"]|className=\\{`[^`]+`\\}|d=[\'"][^\'"]+[\'"]|blurDataURL=[\'"][^\'"]+[\'"]|/.*?/.*/[gimuy]*',
      'ignoreComments': true,
      'ignoreUrls': true
    }
  ],
  'padded-blocks': ['error', 'never']
});

const stylisticPluginJsxRemovedRules = Object.fromEntries(
  Object.entries(stylisticPlugin.rules).filter(([key]) => !(key.startsWith('jsx-') && key !== 'jsx-quotes'))
);

const stylisticExtend = getExtend(stylisticPrefix, stylisticPluginJsxRemovedRules);

validateRules(stylisticExtend, stylisticRule);

export { stylisticPrefix, stylisticExtend, stylisticRule, stylisticPlugin };
