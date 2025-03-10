import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const sortDestructureKeysPrefix = 'sort-destructure-keys';

const sortDestructureKeysRule = addPrefixRule(sortDestructureKeysPrefix, {});

const sortDestructureKeysExtend = getExtend(sortDestructureKeysPrefix, sortDestructureKeysPlugin.rules);

validateRules(sortDestructureKeysExtend, sortDestructureKeysRule);

export { sortDestructureKeysPrefix, sortDestructureKeysExtend, sortDestructureKeysRule, sortDestructureKeysPlugin };
