const runPrettierOnNonTsFiles = (files) => {
  const excludedExtensions = ['.ts', '.tsx'];

  return files.filter((file) => !excludedExtensions.some((ext) => file.endsWith(ext))).map((file) => `prettier --write "${file}" --ignore-unknown`);
};

export default {
  '*': runPrettierOnNonTsFiles,
  '*.{ts,tsx}': ['prettier --write', 'eslint', () => 'tsc']
};
