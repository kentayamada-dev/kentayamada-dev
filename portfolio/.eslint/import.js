import { getKeyUpdatedObject, getUpdatedPluginRules, removeDeprecatedRule } from './utils.js';
import importPlugin from 'eslint-plugin-import';

const importPrefix = 'import';
const customRules = {
  'no-named-export': 'off',
  'max-dependencies': 'off',
  'extensions': ['error', 'never', { 'json': 'always', 'css': 'always' }],
  'group-exports': 'off', // .eslint/custom/rules/consolidate-exports.js
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
        'order': 'asc',
        'caseInsensitive': true
      },
      'groups': [
        'builtin', // Built-in modules like 'fs'
        'external', // External modules like 'next'
        'internal', // Internal modules from the project
        'parent', // Parent directories like '../'
        'sibling', // Sibling directories like './'
        'index', // Index files like './'
        'object', // Object imports (destructured imports)
        'type', // Type imports
        'unknown' // Unknown
      ],
      'pathGroups': [
        {
          'pattern': '@/utils',
          'group': 'internal'
        },
        {
          'pattern': '@/components/**',
          'group': 'internal'
        },
        {
          'pattern': '@/constants/**/types',
          'group': 'type',
          'position': 'after'
        },
        {
          'pattern': '@/constants/**',
          'group': 'internal'
        },
        {
          'pattern': '@/hooks',
          'group': 'internal'
        },
        {
          'pattern': '@/lib/**',
          'group': 'internal'
        },
        {
          'pattern': '@/typeGuards',
          'group': 'internal'
        },
        {
          'pattern': '@/types/**',
          'group': 'type',
          'position': 'after'
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
      'devDependencies': ['**/index.stories.tsx', '**/*.test.ts'],
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
