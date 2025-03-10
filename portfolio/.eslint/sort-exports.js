import sortExportsPlugin from 'eslint-plugin-sort-exports';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const sortExportsPrefix = 'sort-exports';

const sortExportsRule = addPrefixRule(sortExportsPrefix, {
  'sort-exports': ['error', { 'sortDir': 'asc' }]
});

const sortExportsExtend = getExtend(sortExportsPrefix, sortExportsPlugin.rules);

validateRules(sortExportsExtend, sortExportsRule);

export { sortExportsPrefix, sortExportsExtend, sortExportsRule, sortExportsPlugin };
