import { getKeyUpdatedObject, getUpdatedPluginRules, removeDeprecatedRule } from './utils.js';
import importPlugin from 'eslint-plugin-import';

const importPrefix = 'import';
const customRules = {
  'consistent-type-specifier-style': 'off',
  'namespace': 'off',
  'no-deprecated': 'off',
  'no-internal-modules': 'off',
  'no-unassigned-import': [
    'error',
    {
      'allow': ['**/*.css']
    }
  ],
  'no-unresolved': 'off',
  'order': [
    'error',
    {
      'alphabetize': {
        'order': 'asc'
      },
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type', 'unknown'],
      'pathGroups': [
        {
          pattern: '@/components/**',
          group: 'parent',
          position: 'before'
        },
        {
          pattern: '@/constants',
          group: 'parent',
          position: 'after'
        },
        {
          'group': 'unknown',
          'pattern': '*.css',
          'patternOptions': {
            'matchBase': true
          }
        }
      ],
      'warnOnUnassignedImports': true
    }
  ],
  'prefer-default-export': 'off',
  'no-extraneous-dependencies': [
    'error',
    {
      'devDependencies': ['**/index.stories.ts'],
      'optionalDependencies': false,
      'peerDependencies': false,
      'includeInternal': false,
      'includeTypes': false
    }
  ]
};

const importRules = getKeyUpdatedObject(
  getUpdatedPluginRules(importPrefix, removeDeprecatedRule(importPlugin.rules), customRules),
  importPrefix
);

export { importPrefix, importPlugin, importRules };
