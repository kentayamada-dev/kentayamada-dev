import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';

const sortDestructureKeysPrefix = 'sort-destructure-keys';
const customRules = {};
const sortDestructureKeysPluginRules = sortDestructureKeysPlugin.rules;
const sortDestructureKeysRules = getKeyUpdatedObject(
  getUpdatedPluginRules(sortDestructureKeysPrefix, sortDestructureKeysPluginRules, customRules),
  sortDestructureKeysPrefix
);

export { sortDestructureKeysPrefix, sortDestructureKeysPlugin, sortDestructureKeysRules };
