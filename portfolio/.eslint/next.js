import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import nextPlugin from '@next/eslint-plugin-next';

const nextPrefix = '@next/next';
const customRules = {};
const nextRules = getKeyUpdatedObject(getUpdatedPluginRules(nextPrefix, nextPlugin.rules, customRules), nextPrefix);

export { nextPrefix, nextPlugin, nextRules };
