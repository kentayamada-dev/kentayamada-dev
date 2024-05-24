import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import storybookPlugin from 'eslint-plugin-storybook';

const storybookPrefix = 'storybook';
const customRules = { 'no-title-property-in-meta': 'off' };
const storybookRules = getKeyUpdatedObject(
  getUpdatedPluginRules(storybookPrefix, storybookPlugin.rules, customRules),
  storybookPrefix
);

export { storybookPrefix, storybookPlugin, storybookRules };
