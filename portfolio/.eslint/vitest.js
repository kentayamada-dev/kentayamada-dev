import vitestPlugin from '@vitest/eslint-plugin';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const vitestPrefix = 'vitest';

const vitestRule = addPrefixRule(vitestPrefix, {
  'prefer-to-be-falsy': 'off',
  'prefer-to-be-truthy': 'off',
  'no-hooks': [
    'error',
    {
      'allow': ['beforeEach']
    }
  ]
});

const vitestExtend = getExtend(vitestPrefix, vitestPlugin.rules);

validateRules(vitestExtend, vitestRule);

const vitestGlobals = vitestPlugin.environments.env.globals;

export { vitestPrefix, vitestExtend, vitestRule, vitestPlugin, vitestGlobals };
