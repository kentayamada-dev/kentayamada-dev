import { eslintRule, eslintExtend } from './.eslint/eslint.js';
import { tseslintExtend, tseslintRule, tseslintPlugin, tseslintConfig, tseslintDuplicatedEslintRules } from './.eslint/tseslint.js';
import { importPlugin, importPrefix, importRule, importExtend } from './.eslint/import.js';
import { stylisticExtend, stylisticPlugin, stylisticPrefix, stylisticRule } from './.eslint/stylistic.js';
import { sortExportsExtend, sortExportsPlugin, sortExportsPrefix, sortExportsRule } from './.eslint/sort-exports.js';
import { cspellExtend, cspellPlugin, cspellPrefix, cspellRule } from './.eslint/cspell.js';
import { reactExtend, reactPlugin, reactPrefix, reactRule } from './.eslint/react.js';
import { vitestExtend, vitestPlugin, vitestPrefix, vitestRule, vitestGlobals } from './.eslint/vitest.js';
import { nextExtend, nextPlugin, nextPrefix, nextRule } from './.eslint/next.js';
import { reactHooksExtend, reactHooksPlugin, reactHooksPrefix, reactHooksRule } from './.eslint/react-hooks.js';
import { storybookExtend, storybookPlugin, storybookPrefix, storybookRule } from './.eslint/storybook.js';
import { eslintCommentsExtend, eslintCommentsPlugin, eslintCommentsPrefix, eslintCommentsRule } from './.eslint/eslint-comments.js';
import {
  sortDestructureKeysExtend,
  sortDestructureKeysPlugin,
  sortDestructureKeysPrefix,
  sortDestructureKeysRule
} from './.eslint/sort-destructure-keys.js';
import { customPlugin, customPrefix, customPluginRulesName } from './.eslint/custom/index.js';
import globals from 'globals';

export default tseslintPlugin.config(
  {
    name: 'All Files',
    files: ['src/**/*.{ts,tsx}'],
    settings: {
      'import/resolver': {
        typescript: true,
        node: true
      },
      'import/cache': {
        'lifetime': '∞'
      }
    },
    languageOptions: {
      parser: tseslintConfig.languageOptions.parser,
      parserOptions: {
        projectService: true
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      [importPrefix]: importPlugin,
      [stylisticPrefix]: stylisticPlugin,
      [cspellPrefix]: cspellPlugin,
      [sortDestructureKeysPrefix]: sortDestructureKeysPlugin,
      [sortExportsPrefix]: sortExportsPlugin,
      [eslintCommentsPrefix]: eslintCommentsPlugin,
      [customPrefix]: customPlugin,
      ...tseslintConfig.plugins
    },
    extends: [
      eslintExtend,
      tseslintExtend,
      importExtend,
      stylisticExtend,
      cspellExtend,
      sortDestructureKeysExtend,
      sortExportsExtend,
      eslintCommentsExtend
    ],
    rules: {
      ...eslintRule,
      ...importRule,
      ...tseslintRule,
      ...tseslintDuplicatedEslintRules,
      ...stylisticRule,
      ...cspellRule,
      ...sortDestructureKeysRule,
      ...sortExportsRule,
      ...eslintCommentsRule,
      [`${customPrefix}/${customPluginRulesName.importOrder}`]: 'error'
    }
  },
  {
    name: 'Root Component Files',
    files: ['src/**/*.tsx'],
    settings: {
      react: {
        version: 'detect'
      }
    },
    languageOptions: {
      ...reactPlugin.configs.flat.all.languageOptions
    },
    plugins: {
      [reactPrefix]: reactPlugin,
      [nextPrefix]: nextPlugin,
      [reactHooksPrefix]: reactHooksPlugin
    },
    extends: [reactExtend, nextExtend, reactHooksExtend],
    rules: {
      ...reactRule,
      ...nextRule,
      ...reactHooksRule,
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      [`${customPrefix}/${customPluginRulesName.jsxSpreadPropsLast}`]: 'error'
    }
  },
  {
    name: 'Test Files',
    files: ['src/**/*.test.ts'],
    plugins: {
      [vitestPrefix]: vitestPlugin
    },
    extends: [vitestExtend],
    settings: {
      vitest: {
        typecheck: true
      }
    },
    languageOptions: {
      globals: {
        ...vitestGlobals
      }
    },
    rules: {
      ...vitestRule
    }
  },
  {
    name: 'Storybook Files',
    files: ['src/app/components/**/index.stories.tsx'],
    plugins: {
      [storybookPrefix]: storybookPlugin
    },
    extends: [storybookExtend],
    rules: {
      ...storybookRule
    }
  }
);
