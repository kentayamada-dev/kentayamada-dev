import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const reactHooksPrefix = 'react-hooks';
const customRules = {};
const reactHooksRules = getKeyUpdatedObject(
  getUpdatedPluginRules(reactHooksPrefix, reactHooksPlugin.rules, customRules),
  reactHooksPrefix
);

export { reactHooksPrefix, reactHooksPlugin, reactHooksRules };
