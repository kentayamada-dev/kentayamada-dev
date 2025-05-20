import importPlugin from 'eslint-plugin-import';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const importPrefix = 'import';

const importRule = addPrefixRule(importPrefix, {
  'extensions': ['error', 'never', { 'json': 'always', 'css': 'always' }],
  'no-unassigned-import': [
    'error',
    {
      'allow': ['**/*.css']
    }
  ],
  'no-extraneous-dependencies': [
    'error',
    {
      'devDependencies': ['**/index.stories.tsx', '**/*.test.ts'],
      'optionalDependencies': false,
      'peerDependencies': false,
      'includeInternal': false,
      'includeTypes': false
    }
  ],
  'order': 'off',
  'no-internal-modules': 'off',
  'no-relative-parent-imports': 'off',
  'no-named-export': 'off',
  'max-dependencies': 'off',
  'prefer-default-export': 'off',
  'no-default-export': 'off',
  'dynamic-import-chunkname': 'off'
});

const importExtend = getExtend(importPrefix, importPlugin.rules);

validateRules(importExtend, importRule);

export { importPrefix, importExtend, importRule, importPlugin };
