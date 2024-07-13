import noInlineFunctionsInProps from './rules/no-inline-functions-in-props.js';
import asConstSatisfies from './rules/as-const-satisfies.js';
import consolidateExports from './rules/consolidate-exports.js';
import forceTypesInTypesFile from './rules/force-types-in-types-file.js';

const customPrefix = 'custom';
const customPlugin = {
  'rules': {
    'as-const-satisfies': asConstSatisfies,
    'consolidate-exports': consolidateExports,
    'no-inline-functions-in-props': noInlineFunctionsInProps,
    'force-types-in-types-file': forceTypesInTypesFile
  }
};

export { customPrefix, customPlugin };
