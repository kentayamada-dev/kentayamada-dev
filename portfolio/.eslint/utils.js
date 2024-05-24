const removeDeprecatedRule = (rules) =>
  Object.fromEntries(Object.entries(rules).filter(([_, value]) => !value.meta || !value.meta.deprecated));

const getKeyUpdatedObject = (rules, prefix) =>
  Object.fromEntries(Object.entries(rules).map(([key, value]) => [`${prefix}/${key}`, value]));

const getUpdatedPluginRules = (prefix, pluginRules, customRules) => {
  const updatedPluginRules = Object.fromEntries(Object.keys(pluginRules).map((key) => [key, 'error']));
  Object.entries(customRules).forEach(([key, value]) => {
    if (key in updatedPluginRules) {
      updatedPluginRules[key] = value;
    } else {
      throw new Error(`Rule "${key}" does not exist in "${prefix}"`);
    }
  });

  return updatedPluginRules;
};

const turnOffCommonKeys = (rules1, rules2) => {
  const result = {};
  Object.keys(rules1).forEach((key) => {
    if (rules2.hasOwnProperty(key)) {
      result[key] = 'off';
    }
  });

  return result;
};

export { getKeyUpdatedObject, getUpdatedPluginRules, turnOffCommonKeys, removeDeprecatedRule };
