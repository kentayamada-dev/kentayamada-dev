import { jsxA11yPlugin, jsxA11yPrefix, jsxA11yRules } from './.eslint/jsx-a11y.js';
import { nextPlugin, nextPrefix, nextRules } from './.eslint/next.js';
import { typescriptPlugin, typescriptPrefix, typescriptRules } from './.eslint/typescript.js';
import { importPlugin, importPrefix, importRules } from './.eslint/import.js';
import { deprecationPlugin, deprecationPrefix, deprecationRules } from './.eslint/deprecation.js';
import { reactPlugin, reactPrefix, reactRules } from './.eslint/react.js';
import { reactHooksPlugin, reactHooksPrefix, reactHooksRules } from './.eslint/react-hooks.js';
import { cspellPlugin, cspellPrefix, cspellRules } from './.eslint/cspell.js';
import { storybookPlugin, storybookPrefix, storybookRules } from './.eslint/storybook.js';
import { sortExportsPlugin, sortExportsPrefix, sortExportsRules } from './.eslint/sort-exports.js';
import { eslintRules } from './.eslint/eslint.js';
import {
  sortDestructureKeysPlugin,
  sortDestructureKeysPrefix,
  sortDestructureKeysRules
} from './.eslint/sort-destructure-keys.js';
import typescriptParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    'files': ['src/**/*.{ts,tsx}'],
    'languageOptions': {
      'parser': typescriptParser,
      'parserOptions': {
        'project': './tsconfig.json'
      }
    },
    'plugins': {
      [typescriptPrefix]: typescriptPlugin,
      [importPrefix]: importPlugin,
      [deprecationPrefix]: deprecationPlugin,
      [cspellPrefix]: cspellPlugin,
      [sortDestructureKeysPrefix]: sortDestructureKeysPlugin,
      [sortExportsPrefix]: sortExportsPlugin
    },
    'rules': {
      ...eslintRules,
      ...typescriptRules,
      ...importRules,
      ...deprecationRules,
      ...cspellRules,
      ...sortDestructureKeysRules,
      ...sortExportsRules
    }
  },
  {
    'files': ['src/**/*.tsx'],
    'settings': {
      'react': {
        'version': 'detect'
      }
    },
    'plugins': {
      [reactPrefix]: reactPlugin,
      [reactHooksPrefix]: reactHooksPlugin,
      [nextPrefix]: nextPlugin,
      [jsxA11yPrefix]: jsxA11yPlugin
    },
    'rules': {
      ...jsxA11yRules,
      ...nextRules,
      ...reactRules,
      ...reactHooksRules,
      'jsx-quotes': ['error', 'prefer-single'],
      'func-style': ['error', 'expression', { 'allowArrowFunctions': true }]
    }
  },
  {
    'files': ['src/components/**/*.tsx'],
    'rules': {
      [`${reactPrefix}/function-component-definition`]: [
        'error',
        { 'namedComponents': 'arrow-function', 'unnamedComponents': 'arrow-function' }
      ]
    }
  },
  {
    'files': ['src/**/index.stories.ts'],
    'plugins': {
      [storybookPrefix]: storybookPlugin
    },
    'rules': {
      ...storybookRules,
      'quote-props': ['error', 'consistent-as-needed']
    }
  }
];
