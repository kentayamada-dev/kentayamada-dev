export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow inline functions in props',
      category: 'Best Practices',
      recommended: true
    }
  },

  create(context) {
    function isInlineFunction(expression) {
      return expression && (expression.type === 'ArrowFunctionExpression' || expression.type === 'FunctionExpression');
    }

    return {
      JSXAttribute(node) {
        if (node.value && isInlineFunction(node.value.expression)) {
          context.report({
            node,
            message: 'Do not use inline functions in props.'
          });
        }
      }
    };
  }
};
