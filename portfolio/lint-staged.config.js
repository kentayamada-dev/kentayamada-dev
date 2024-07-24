export default {
  '*.{ts,tsx}': ['prettier --write', 'eslint', () => 'tsc']
};
