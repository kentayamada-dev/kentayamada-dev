import { getKeyUpdatedObject, getUpdatedPluginRules, removeDeprecatedRule } from './utils.js';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

const jsxA11yPrefix = 'jsx-a11y';
const customRules = {};

const jsxA11yRules = getKeyUpdatedObject(
  getUpdatedPluginRules(jsxA11yPrefix, removeDeprecatedRule(jsxA11yPlugin.rules), customRules),
  jsxA11yPrefix
);

export { jsxA11yPrefix, jsxA11yPlugin, jsxA11yRules };
