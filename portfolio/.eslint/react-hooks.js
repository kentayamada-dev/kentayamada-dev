import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const reactHooksPrefix = 'react-hooks';

const reactHooksRule = addPrefixRule(reactHooksPrefix, {});

const reactHooksExtend = getExtend(reactHooksPrefix, reactHooksPlugin.rules);

validateRules(reactHooksExtend, reactHooksRule);

export { reactHooksPrefix, reactHooksExtend, reactHooksRule, reactHooksPlugin };
