const runPrettierOnNonTsFiles = (files) => {
  const excludedExtensions = ['.sh', '.ts', '.tsx'];

  return files.filter((file) => !excludedExtensions.some((ext) => file.endsWith(ext))).map((file) => `prettier --write "${file}"`);
};

export default {
  '*': runPrettierOnNonTsFiles,
  '*.{ts,tsx}': ['prettier --write', 'eslint', () => 'tsc']
};
