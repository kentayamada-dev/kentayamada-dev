import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const reactHooksPrefix = 'react-hooks';
const customRules = {};
const reactHooksPluginRules = reactHooksPlugin.rules;
const reactHooksRules = getKeyUpdatedObject(
  getUpdatedPluginRules(reactHooksPrefix, reactHooksPluginRules, customRules),
  reactHooksPrefix
);

export { reactHooksPrefix, reactHooksPlugin, reactHooksRules };
