import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import sortExportsPlugin from 'eslint-plugin-sort-exports';

const sortExportsPrefix = 'sort-exports';
const customRules = {
  'sort-exports': ['error', { 'sortDir': 'asc' }]
};

const sortExportsRules = getKeyUpdatedObject(
  getUpdatedPluginRules(sortExportsPrefix, sortExportsPlugin.rules, customRules),
  sortExportsPrefix
);

export { sortExportsPrefix, sortExportsPlugin, sortExportsRules };
