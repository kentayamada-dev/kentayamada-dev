import { nextPlugin, nextPrefix, nextRules } from './.eslint/next.js';
import { typescriptPlugin, typescriptPrefix, typescriptRules } from './.eslint/typescript.js';
import { importPlugin, importPrefix, importRules } from './.eslint/import.js';
import { deprecationPlugin, deprecationPrefix, deprecationRules } from './.eslint/deprecation.js';
import { reactPlugin, reactPrefix, reactRules } from './.eslint/react.js';
import { reactHooksPlugin, reactHooksPrefix, reactHooksRules } from './.eslint/react-hooks.js';
import { cspellPlugin, cspellPrefix, cspellRules } from './.eslint/cspell.js';
import { storybookPlugin, storybookPrefix, storybookRules } from './.eslint/storybook.js';
import { tailwindcssPlugin, tailwindcssPrefix, tailwindcssRules } from './.eslint/tailwindcss.js';
import { sortExportsPlugin, sortExportsPrefix, sortExportsRules } from './.eslint/sort-exports.js';
import { vitestPlugin, vitestPrefix, vitestRules } from './.eslint/vitest.js';
import { eslintCommentsPlugin, eslintCommentsPrefix, eslintCommentsRules } from './.eslint/eslint-comments.js';
import { eslintRules } from './.eslint/eslint.js';
import {
  sortDestructureKeysPlugin,
  sortDestructureKeysPrefix,
  sortDestructureKeysRules
} from './.eslint/sort-destructure-keys.js';
import typescriptParser from '@typescript-eslint/parser';
import { customPlugin, customPrefix } from './.eslint/custom/index.js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    'files': ['src/**/*.{ts,tsx}'],
    'settings': {
      'import/ignore': ['node_modules']
    },
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
      [sortExportsPrefix]: sortExportsPlugin,
      [customPrefix]: customPlugin,
      [eslintCommentsPrefix]: eslintCommentsPlugin
    },
    'rules': {
      ...eslintRules,
      ...typescriptRules,
      ...importRules,
      ...deprecationRules,
      ...cspellRules,
      ...sortDestructureKeysRules,
      ...sortExportsRules,
      ...eslintCommentsRules,
      [`${customPrefix}/as-const-satisfies`]: 'error',
      [`${customPrefix}/consolidate-exports`]: 'error',
      [`${customPrefix}/force-types-in-types-file`]: 'error'
    }
  },
  {
    'files': ['src/**/*.test.ts'],
    'plugins': {
      [vitestPrefix]: vitestPlugin
    },
    'rules': {
      ...vitestRules
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
      [tailwindcssPrefix]: tailwindcssPlugin,
      [reactPrefix]: reactPlugin,
      [reactHooksPrefix]: reactHooksPlugin,
      [nextPrefix]: nextPlugin
    },
    'rules': {
      ...nextRules,
      ...reactRules,
      ...reactHooksRules,
      ...tailwindcssRules,
      'import/no-default-export': 'off',
      'jsx-quotes': ['error', 'prefer-single'],
      'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }],
      [`${customPrefix}/no-inline-functions-in-props`]: 'error'
    }
  },
  {
    'files': ['src/app/components/**/*.tsx'],
    'rules': {
      [`${reactPrefix}/function-component-definition`]: [
        'error',
        { 'namedComponents': 'arrow-function', 'unnamedComponents': 'arrow-function' }
      ]
    }
  },
  {
    'files': ['src/app/components/**/index.stories.tsx'],
    'plugins': {
      [storybookPrefix]: storybookPlugin
    },
    'rules': {
      ...storybookRules,
      'quote-props': ['error', 'consistent-as-needed']
    }
  }
];
