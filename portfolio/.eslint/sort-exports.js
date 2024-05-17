import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import sortExportsPlugin from 'eslint-plugin-sort-exports';

const sortExportsPrefix = 'sort-exports';
const customRules = {
  'sort-exports': ['error', { 'sortDir': 'asc' }]
};
const sortExportsPluginRules = sortExportsPlugin.rules;
const sortExportsRules = getKeyUpdatedObject(
  getUpdatedPluginRules(sortExportsPrefix, sortExportsPluginRules, customRules),
  sortExportsPrefix
);

export { sortExportsPrefix, sortExportsPlugin, sortExportsRules };
