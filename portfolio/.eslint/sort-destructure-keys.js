import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';

const sortDestructureKeysPrefix = 'sort-destructure-keys';
const customRules = {};
const sortDestructureKeysRules = getKeyUpdatedObject(
  getUpdatedPluginRules(sortDestructureKeysPrefix, sortDestructureKeysPlugin.rules, customRules),
  sortDestructureKeysPrefix
);

export { sortDestructureKeysPrefix, sortDestructureKeysPlugin, sortDestructureKeysRules };
