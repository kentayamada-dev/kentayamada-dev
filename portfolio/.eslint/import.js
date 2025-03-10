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
