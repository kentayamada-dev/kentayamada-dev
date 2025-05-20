const GROUP = {
  EXT_VALUE: 0,
  LOC_VALUE: 1,
  EXT_TYPE: 2,
  LOC_TYPE: 3,
  EXT_CSS: 4,
  LOC_CSS: 5
};

const LOCAL_GROUPS = new Set([GROUP.LOC_VALUE, GROUP.LOC_TYPE, GROUP.LOC_CSS]);
const CSS_RE = /\.css(\?.*)?$/i;

const isLocal = (src) => src === '.' || src.startsWith('./') || src.startsWith('../') || src.startsWith('@/');

const prefixRank = (src) => {
  if (src.startsWith('@/')) return 0;
  if (src.startsWith('../')) return 1;
  if (src.startsWith('./')) return 2;
  return 3;
};

const groupId = ({ source: { value: src }, importKind }) => {
  const local = isLocal(src);
  const isCSS = CSS_RE.test(src);
  const isType = importKind === 'type';
  if (isCSS) return local ? GROUP.LOC_CSS : GROUP.EXT_CSS;
  if (isType) return local ? GROUP.LOC_TYPE : GROUP.EXT_TYPE;
  return local ? GROUP.LOC_VALUE : GROUP.EXT_VALUE;
};

const compareImports = (a, b) => {
  if (a.grp !== b.grp) return a.grp - b.grp;
  if (LOCAL_GROUPS.has(a.grp)) {
    const diff = prefixRank(a.src) - prefixRank(b.src);
    if (diff) return diff;
  }
  return a.src < b.src ? -1 : a.src > b.src ? 1 : 0;
};

const MSG = 'Import order: ext-val, loc-val, ext-type, loc-type, ext-CSS, loc-CSS; local @/ > ../ > ./ > "." and alpha within each.';

export default {
  meta: {
    type: 'problem',
    fixable: 'code'
  },

  create(context) {
    return {
      Program(programNode) {
        const importNodes = [];

        for (const node of programNode.body) {
          if (node.type === 'ImportDeclaration') importNodes.push(node);
        }

        if (importNodes.length < 2) return;

        const entries = [];
        let prev = null;
        let sorted = true;

        for (const node of importNodes) {
          const entry = { node, src: node.source.value, grp: groupId(node) };
          entries.push(entry);
          if (prev && compareImports(prev, entry) > 0) sorted = false;
          prev = entry;
        }

        if (sorted) return;

        const desired = [...entries].sort(compareImports);
        const code = context.getSourceCode();
        const fullRange = [importNodes[0].range[0], importNodes.at(-1).range[1]];
        const fixAll = (fixer) => fixer.replaceTextRange(fullRange, desired.map((e) => code.getText(e.node)).join('\n'));

        entries.forEach((entry, idx) => {
          if (entry.node !== desired[idx].node) {
            context.report({ node: entry.node, message: MSG, fix: fixAll });
          }
        });
      }
    };
  }
};
