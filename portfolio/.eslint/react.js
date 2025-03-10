import reactPlugin from 'eslint-plugin-react';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const reactPrefix = 'react';

const reactRule = addPrefixRule(reactPrefix, {
  'destructuring-assignment': ['error', 'never'],
  'jsx-filename-extension': [
    'error',
    {
      'extensions': ['.tsx']
    }
  ],
  'jsx-indent': ['error', 2],
  'jsx-indent-props': ['error', 2],
  'jsx-max-props-per-line': [
    'error',
    {
      'maximum': 10
    }
  ],
  'jsx-newline': [
    'error',
    {
      'prevent': true
    }
  ],
  'jsx-one-expression-per-line': [
    'error',
    {
      'allow': 'single-child'
    }
  ],
  'jsx-max-depth': ['error', { 'max': 10 }],
  'jsx-no-bind': ['error', { 'allowArrowFunctions': true }],
  'jsx-no-literals': 'off',
  'react-in-jsx-scope': 'off',
  'jsx-props-no-spreading': 'off',
  'forbid-component-props': 'off',
  'prop-types': 'off'
});

const reactExtend = getExtend(reactPrefix, reactPlugin.rules);

validateRules(reactExtend, reactRule);

export { reactPrefix, reactExtend, reactRule, reactPlugin };
