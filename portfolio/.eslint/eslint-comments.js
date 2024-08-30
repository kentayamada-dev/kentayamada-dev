import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';

const eslintCommentsPrefix = 'eslint-comments';
const customRules = {
  'no-use': 'off',
  'require-description': 'off'
};
const eslintCommentsRules = getKeyUpdatedObject(
  getUpdatedPluginRules(eslintCommentsPrefix, eslintCommentsPlugin.rules, customRules),
  eslintCommentsPrefix
);

export { eslintCommentsPrefix, eslintCommentsPlugin, eslintCommentsRules };
