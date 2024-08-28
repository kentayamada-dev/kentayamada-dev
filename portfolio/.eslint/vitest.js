import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import vitestPlugin from '@vitest/eslint-plugin';

const vitestPrefix = 'vitest';
const customRules = {
  'no-hooks': [
    'error',
    {
      'allow': ['beforeEach']
    }
  ]
};
const vitestRules = getKeyUpdatedObject(
  getUpdatedPluginRules(vitestPrefix, vitestPlugin.rules, customRules),
  vitestPrefix
);

export { vitestPrefix, vitestPlugin, vitestRules };
