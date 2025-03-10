const getExtend = (prefix, rules) => {
  return {
    rules: Object.keys(rules).reduce((acc, key) => {
      if (!rules[key].meta.deprecated) {
        acc[`${prefix}/${key}`] = 'error';
      }
      return acc;
    }, {})
  };
};

const addPrefixRule = (prefix, rules) => {
  return Object.fromEntries(Object.entries(rules).map(([key, value]) => [`${prefix}/${key}`, value]));
};

const validateRules = (lintExtend, customRules) => {
  const { rules: eslintRules } = lintExtend;

  for (const key in customRules) {
    if (!(key in eslintRules)) {
      throw new Error(`Invalid rule detected: '${key}' is not in the eslint rules`);
    }
  }
};

export { getExtend, addPrefixRule, validateRules };
