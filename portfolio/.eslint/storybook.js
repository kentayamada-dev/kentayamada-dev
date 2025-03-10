import storybookPlugin from 'eslint-plugin-storybook';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const storybookPrefix = 'storybook';

const storybookRule = addPrefixRule(storybookPrefix, { 'no-title-property-in-meta': 'off' });

const storybookExtend = getExtend(storybookPrefix, storybookPlugin.rules);

validateRules(storybookExtend, storybookRule);

export { storybookPrefix, storybookExtend, storybookRule, storybookPlugin };
