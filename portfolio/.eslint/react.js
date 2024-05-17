import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import reactPlugin from 'eslint-plugin-react';

const reactPrefix = 'react';
const customRules = {
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
      'maximum': 5
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
  'react-in-jsx-scope': 'off'
};

const reactPluginRules = Object.fromEntries(
  Object.entries(reactPlugin.rules).filter(([_, value]) => !value.meta || !value.meta.deprecated)
);
const reactRules = getKeyUpdatedObject(getUpdatedPluginRules(reactPrefix, reactPluginRules, customRules), reactPrefix);

export { reactPrefix, reactPlugin, reactRules };
