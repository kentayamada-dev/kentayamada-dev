import tseslintPlugin from 'typescript-eslint';
import { addPrefixRule, validateRules } from './utils.js';

const tseslintPrefix = '@typescript-eslint';

const tseslintRule = addPrefixRule(tseslintPrefix, {
  'no-magic-numbers': ['error', { 'ignoreArrayIndexes': true, 'ignoreTypeIndexes': true }],
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
          'group': ['**/atoms/*'],
          'message': "Please import from '@/components/atoms' instead."
        },
        {
          'group': ['**/molecules/*'],
          'message': "Please import from '@/components/molecules' instead."
        },
        {
          'group': ['**/organisms/*'],
          'message': "Please import from '@/components/organisms' instead."
        },
        {
          'group': ['**/templates/*'],
          'message': "Please import from '@/components/templates' instead."
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
  'member-ordering': [
    'error',
    {
      'default': {
        'order': 'alphabetically'
      }
    }
  ],
  'no-unused-vars': [
    'error',
    {
      'args': 'all',
      'argsIgnorePattern': '^_',
      'caughtErrors': 'all',
      'caughtErrorsIgnorePattern': '^_',
      'destructuredArrayIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'ignoreRestSiblings': true
    }
  ],
  'explicit-module-boundary-types': 'off',
  'prefer-readonly-parameter-types': 'off',
  'max-params': 'off'
});

function getSeparatedRules() {
  const tseslintConfigsAll = tseslintPlugin.configs.all;
  const allRules = tseslintConfigsAll.find((config) => config.name === 'typescript-eslint/all').rules;
  const tseslintConfig = tseslintConfigsAll.find((config) => config.name === 'typescript-eslint/base');
  const tsEslintRules = {};
  const tseslintDuplicatedEslintRules = {};

  Object.entries(allRules).forEach(([key, value]) => {
    if (key.startsWith(`${tseslintPrefix}/`)) {
      tsEslintRules[key] = value;
    } else {
      tseslintDuplicatedEslintRules[key] = value;
    }
  });

  const tseslintExtend = { rules: tsEslintRules };

  return { tseslintExtend, tseslintDuplicatedEslintRules, tseslintConfig };
}

const separatedRules = getSeparatedRules();

const tseslintExtend = separatedRules.tseslintExtend;
const tseslintConfig = separatedRules.tseslintConfig;
const tseslintDuplicatedEslintRules = separatedRules.tseslintDuplicatedEslintRules;

validateRules(tseslintExtend, tseslintRule);

export { tseslintRule, tseslintExtend, tseslintPlugin, tseslintConfig, tseslintDuplicatedEslintRules };
