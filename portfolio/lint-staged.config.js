const tsExtensions = ['.ts', '.tsx'];

const runPrettierOnNonTsFiles = (files) => {
  return files.filter((file) => !tsExtensions.some((ext) => file.endsWith(ext))).map((file) => `prettier --write "${file}" --ignore-unknown`);
};

export default {
  '*': runPrettierOnNonTsFiles,
  [`*.{${tsExtensions.map((ext) => ext.slice(1)).join(',')}}`]: ['prettier --write', 'eslint', () => 'tsc']
};
