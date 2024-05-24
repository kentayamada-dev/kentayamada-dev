import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

const typescriptPrefix = '@typescript-eslint';
const customRules = {
  'ban-ts-comment': [
    'error',
    {
      'ts-check': true,
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': true,
      'ts-nocheck': true
    }
  ],
  'consistent-type-definitions': ['error', 'type'],
  'explicit-module-boundary-types': 'off',
  'indent': [
    'error',
    2,
    {
      'SwitchCase': 1,
      'ignoredNodes': ['TSTypeParameterInstantiation']
    }
  ],
  'naming-convention': [
    'error',
    {
      'format': ['PascalCase'],
      'modifiers': ['exported'],
      'selector': 'function'
    },
    {
      'format': ['PascalCase'],
      'selector': 'typeAlias'
    }
  ],
  'no-restricted-imports': [
    'error',
    {
      'patterns': [
        {
          'group': ['**/../types/**'],
          'message': "import from '@/types/' instead."
        },
        {
          'group': ['**/../components/**'],
          'message': "import from '@/components/' instead."
        }
      ],
      'paths': [
        {
          'importNames': ['default'],
          'message': 'No need to import React. Delete it.',
          'name': 'react'
        }
      ]
    }
  ],
  'no-unnecessary-type-assertion': 'off',
  'no-unsafe-call': 'off',
  'no-unused-vars': 'off',
  'restrict-plus-operands': [
    'error',
    {
      'allowAny': false,
      'allowBoolean': false,
      'allowNullish': false,
      'allowNumberAndString': false,
      'allowRegExp': false,
      'skipCompoundAssignments': false
    }
  ],
  'object-curly-spacing': ['error', 'always'],
  'padding-line-between-statements': [
    'error',
    {
      'blankLine': 'always',
      'next': 'return',
      'prev': '*'
    },
    {
      'blankLine': 'always',
      'next': '*',
      'prev': ['const', 'let']
    },
    {
      'blankLine': 'any',
      'next': ['const', 'let'],
      'prev': ['const', 'let']
    }
  ],
  'prefer-readonly-parameter-types': 'off',
  'prefer-ts-expect-error': 'off',
  'quotes': ['error', 'single'],
  'no-type-alias': 'off',
  'space-before-function-paren': [
    'error',
    {
      'anonymous': 'never',
      'asyncArrow': 'always',
      'named': 'never'
    }
  ],
  'comma-dangle': [
    'error',
    {
      'arrays': 'never',
      'objects': 'never',
      'imports': 'never',
      'exports': 'always-multiline',
      'functions': 'never'
    }
  ],
  'no-extra-parens': ['error', 'all', { ignoreJSX: 'all' }],
  'no-magic-numbers': 'off',
  'member-ordering': [
    'error',
    {
      'default': {
        'order': 'alphabetically'
      }
    }
  ]
};
const typescriptRules = getKeyUpdatedObject(
  getUpdatedPluginRules(typescriptPrefix, typescriptPlugin.rules, customRules),
  typescriptPrefix
);

export { typescriptPrefix, typescriptPlugin, typescriptRules };
