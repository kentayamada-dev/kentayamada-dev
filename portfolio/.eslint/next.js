import nextPlugin from '@next/eslint-plugin-next';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const nextPrefix = '@next/next';

const nextRule = addPrefixRule(nextPrefix, {});

const nextExtend = getExtend(nextPrefix, nextPlugin.rules);

validateRules(nextExtend, nextRule);

export { nextPrefix, nextExtend, nextRule, nextPlugin };
