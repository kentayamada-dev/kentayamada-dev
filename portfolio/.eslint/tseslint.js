import tseslintPlugin from 'typescript-eslint';
import { addPrefixRule, validateRules } from './utils.js';

const tseslintPrefix = '@typescript-eslint';

const tseslintRule = addPrefixRule(tseslintPrefix, {
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
      'suffix': ['Type', 'Props', 'Params']
    },
    {
      'selector': ['variable', 'typeProperty'],
      'types': ['boolean'],
      'format': ['camelCase', 'PascalCase'],
      'prefix': ['is', 'has']
    }
  ],
  'no-restricted-imports': [
    'error',
    {
      'patterns': [
        {
          'group': ['../../*'],
          'message': "Please import from '@/' instead."
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
  'max-params': 'off',
  'no-magic-numbers': 'off'
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
