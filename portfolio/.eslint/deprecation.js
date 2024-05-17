import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import deprecationPlugin from 'eslint-plugin-deprecation';

const deprecationPrefix = 'deprecation';
const customRules = {};
const deprecationPluginRules = deprecationPlugin.rules;
const deprecationRules = getKeyUpdatedObject(
  getUpdatedPluginRules(deprecationPrefix, deprecationPluginRules, customRules),
  deprecationPrefix
);

export { deprecationPrefix, deprecationPlugin, deprecationRules };
