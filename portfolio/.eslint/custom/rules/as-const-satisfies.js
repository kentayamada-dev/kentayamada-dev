export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce the use of "as const satisfies" for object literals',
      category: 'Best Practices',
      recommended: true
    }
  },

  create(context) {
    return {
      VariableDeclarator(node) {
        if (
          node.init &&
          (node.init.type === 'ObjectExpression' ||
            node.init.type === 'TSAsExpression' ||
            node.init.type === 'TSSatisfiesExpression') &&
          node.parent.kind === 'const'
        ) {
          const sourceCode = context.getSourceCode();
          const text = sourceCode.getText(node);

          if (!text.includes('as const') && !text.includes('satisfies')) {
            context.report({
              node,
              message: 'Object literals should use "as const" or "satisfies".'
            });
          }
        }
      }
    };
  }
};
