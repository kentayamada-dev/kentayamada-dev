import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import nextPlugin from '@next/eslint-plugin-next';

const nextPrefix = '@next/next';
const customRules = {};
const nextPluginRules = nextPlugin.rules;
const nextRules = getKeyUpdatedObject(getUpdatedPluginRules(nextPrefix, nextPluginRules, customRules), nextPrefix);

export { nextPrefix, nextPlugin, nextRules };
