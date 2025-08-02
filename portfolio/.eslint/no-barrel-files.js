import noBarrelFilesPlugin from 'eslint-plugin-no-barrel-files';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const noBarrelFilesPrefix = 'no-barrel-files';

const noBarrelFilesRule = addPrefixRule(noBarrelFilesPrefix, {});

const noBarrelFilesExtend = getExtend(noBarrelFilesPrefix, noBarrelFilesPlugin.rules);

validateRules(noBarrelFilesExtend, noBarrelFilesRule);

export { noBarrelFilesPrefix, noBarrelFilesExtend, noBarrelFilesRule, noBarrelFilesPlugin };
