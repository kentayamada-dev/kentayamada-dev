export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce writing type information in types.ts',
      category: 'Best Practices',
      recommended: true
    }
  },

  create(context) {
    return {
      TSTypeAliasDeclaration(node) {
        const filename = context.getFilename();
        if (!filename.endsWith('types.ts')) {
          context.report({
            node,
            message: 'Type aliases should be declared in types.ts file.'
          });
        }
      }
    };
  }
};
