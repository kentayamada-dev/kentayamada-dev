import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import deprecationPlugin from 'eslint-plugin-deprecation';

const deprecationPrefix = 'deprecation';
const customRules = {};
const deprecationRules = getKeyUpdatedObject(
  getUpdatedPluginRules(deprecationPrefix, deprecationPlugin.rules, customRules),
  deprecationPrefix
);

export { deprecationPrefix, deprecationPlugin, deprecationRules };
