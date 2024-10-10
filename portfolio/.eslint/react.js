import { getKeyUpdatedObject, getUpdatedPluginRules, removeDeprecatedRule } from './utils.js';
import reactPlugin from 'eslint-plugin-react';

const reactPrefix = 'react';
const customRules = {
  'forbid-component-props': 'off',
  'destructuring-assignment': ['error', 'never'],
  'prop-types': 'off',
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
  'jsx-no-bind': 'off',
  'jsx-no-literals': 'off',
  'jsx-one-expression-per-line': [
    'error',
    {
      'allow': 'single-child'
    }
  ],
  'react-in-jsx-scope': 'off',
  'jsx-max-depth': ['error', { 'max': 10 }]
};

const reactRules = getKeyUpdatedObject(
  getUpdatedPluginRules(reactPrefix, removeDeprecatedRule(reactPlugin.rules), customRules),
  reactPrefix
);

export { reactPrefix, reactPlugin, reactRules };
