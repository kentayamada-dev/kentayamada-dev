import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import storybookPlugin from 'eslint-plugin-storybook';

const storybookPrefix = 'storybook';
const customRules = { 'no-title-property-in-meta': 'off' };
const storybookPluginRules = storybookPlugin.rules;
const storybookRules = getKeyUpdatedObject(
  getUpdatedPluginRules(storybookPrefix, storybookPluginRules, customRules),
  storybookPrefix
);

export { storybookPrefix, storybookPlugin, storybookRules };
