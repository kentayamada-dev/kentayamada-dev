import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

const typescriptPrefix = '@typescript-eslint';
const customRules = {
  'max-params': 'off',
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
  'naming-convention': [
    'error',
    {
      'format': ['PascalCase'],
      'modifiers': ['exported'],
      'selector': 'function',
      'filter': {
        'regex': '^(generateStaticParams|generateMetadata)$',
        'match': false
      }
    },
    {
      'selector': 'typeAlias',
      'format': ['PascalCase'],
      'suffix': ['Type', 'Props', 'Return']
    }
  ],
  'no-restricted-imports': [
    'error',
    {
      'patterns': [
        {
          'group': ['**/icons/*'],
          'message': "Please import from '@/components/icons' instead."
        },
        {
          'group': ['**/elements/*'],
          'message': "Please import from '@/components/elements' instead."
        },
        {
          'group': ['**/hooks/*'],
          'message': "Please import from '@/hooks' instead."
        },
        {
          'group': ['**/utils/*'],
          'message': "Please import from '@/utils' instead."
        },
        {
          'group': ['**/typeGuards/*'],
          'message': "Please import from '@/typeGuards' instead."
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
  'prefer-readonly-parameter-types': 'off',
  'prefer-ts-expect-error': 'off',
  'no-type-alias': 'off',
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
