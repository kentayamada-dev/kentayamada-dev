export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prefer named exports to be grouped together in a single export declaration',
      category: 'Best Practices',
      recommended: true
    }
  },

  create(context) {
    const exportNodes = {
      modules: new Set(),
      types: new Set(),
      moduleSpecifiers: [],
      typeSpecifiers: []
    };

    function processExportNode(node) {
      if (node.type === 'ExportDefaultDeclaration') {
        exportNodes.modules.add(node);
        return;
      }

      const isTypeExport = node.exportKind === 'type';
      const target = isTypeExport ? exportNodes.types : exportNodes.modules;
      const specifierList = isTypeExport ? exportNodes.typeSpecifiers : exportNodes.moduleSpecifiers;

      if (node.specifiers.length > 0) {
        specifierList.push(node);
      } else {
        target.add(node);
      }
    }

    function reportIssues(set, message) {
      set.forEach((node) => {
        context.report({
          node,
          message
        });
      });
    }

    function reportSpecifierIssues(specifiers, message) {
      if (specifiers.length > 1) {
        specifiers.forEach((node) => {
          context.report({
            node,
            message
          });
        });
      }
    }

    return {
      ExportNamedDeclaration: processExportNode,
      ExportDefaultDeclaration: processExportNode,
      'Program:exit'() {
        reportIssues(
          exportNodes.modules,
          'Named export declarations should be consolidated into a single export declaration'
        );
        reportSpecifierIssues(
          exportNodes.moduleSpecifiers,
          'Multiple export specifier declarations should be consolidated into a single export declaration'
        );
        reportIssues(
          exportNodes.types,
          'Named type export declarations should be consolidated into a single export declaration'
        );
        reportSpecifierIssues(
          exportNodes.typeSpecifiers,
          'Multiple type export specifier declarations should be consolidated into a single export declaration'
        );
      }
    };
  }
};
