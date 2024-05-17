import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

const jsxA11yPrefix = 'jsx-a11y';
const customRules = {};
const jsxA11yPluginRules = Object.fromEntries(
  Object.entries(jsxA11yPlugin.rules).filter(([_, value]) => !value.meta || !value.meta.deprecated)
);
const jsxA11yRules = getKeyUpdatedObject(
  getUpdatedPluginRules(jsxA11yPrefix, jsxA11yPluginRules, customRules),
  jsxA11yPrefix
);

export { jsxA11yPrefix, jsxA11yPlugin, jsxA11yRules };
