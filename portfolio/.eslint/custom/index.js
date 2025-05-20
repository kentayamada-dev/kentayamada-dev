import jsxSpreadPropsLast from './rules/jsx-spread-props-last.js';
import importOrder from './rules/import-order.js';

const customPrefix = 'custom';

const customPluginRulesName = {
  importOrder: 'jsx-spread-props-last',
  jsxSpreadPropsLast: 'import-order'
};

const customPlugin = {
  rules: {
    [customPluginRulesName.jsxSpreadPropsLast]: jsxSpreadPropsLast,
    [customPluginRulesName.importOrder]: importOrder
  }
};

export { customPrefix, customPlugin, customPluginRulesName };
