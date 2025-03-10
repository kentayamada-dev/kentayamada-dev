import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const eslintCommentsPrefix = 'eslint-comments';

const eslintCommentsRule = addPrefixRule(eslintCommentsPrefix, {
  'no-use': 'off',
  'require-description': 'off'
});

const eslintCommentsExtend = getExtend(eslintCommentsPrefix, eslintCommentsPlugin.rules);

validateRules(eslintCommentsExtend, eslintCommentsRule);

export { eslintCommentsPrefix, eslintCommentsExtend, eslintCommentsRule, eslintCommentsPlugin };
