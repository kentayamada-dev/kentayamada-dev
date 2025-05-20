export default {
  meta: {
    type: 'problem'
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        let seenSpread = false;

        for (const attr of node.attributes) {
          if (attr.type === 'JSXSpreadAttribute') {
            seenSpread = true;
            continue;
          }

          if (seenSpread) {
            context.report({
              node: attr,
              message: 'Spread attributes (e.g. {...props}) must come last in the JSX props list.'
            });
          }
        }
      }
    };
  }
};
